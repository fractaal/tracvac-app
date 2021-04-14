const start = Date.now();

// Libraries
import http from 'http';
import https from 'https';
import express, {NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import Logger from './logger';
import { getConfig } from "./config";
import { json } from 'body-parser';
import fileUpload from "express-fileupload";
import cors from 'cors';
import expressBasicAuth from "express-basic-auth";

const logger = Logger(`Worker Main`);
export const app = express();
export const staticPath = path.resolve(process.cwd(), 'public')
export const internalStaticPath = path.join(__dirname, '../static')
export const frontEndPath = path.join(__dirname, '../app')

let isHTTPSAvailable = true;

// Write exception logs to disk
const exceptionLogger = (error: Error) => {
  logger.error(error.stack)
  fs.writeFileSync(path.resolve(process.cwd(), `${Date.now()}-error.log`), error.stack as string, {encoding: 'utf-8'});
  process.exit(1);
}

process.on('uncaughtException', exceptionLogger)
process.on('unhandledRejection', exceptionLogger)

// Use middleware
app.use(cors());
app.use(json());
app.use(fileUpload({
  limits: { fileSize: 1024 * 1024 },
  abortOnLimit: true
}))

// Create static folder if it doesn't exist already
if (!fs.existsSync(staticPath)) fs.mkdirSync(staticPath);


(async () => {
  // Public paths
  app.use('/public', express.static(staticPath));
  app.use('/public', express.static(path.join(__dirname, '../public')));

  // Application path
  app.use('/app', express.static(frontEndPath));
  app.use('/', express.static(frontEndPath));

  // Secure static paths to admin interface
  app.use('/secure', expressBasicAuth({users: {admin: (await getConfig()).adminPassword}, challenge: true}))
  app.use('/secure/*', expressBasicAuth({users: {admin: (await getConfig()).adminPassword}, challenge: true}))
  /**
  app.use('/secure', async (req, res, next) => {
    if (req.socket.localAddress === req.socket.remoteAddress) {
      next();
    } else {
      logger.warn(`An attempt to access secure static files was made from ${req.socket.remoteAddress}`)
      res.status(401).json({result: false, message: "You are not authorized"});
      return;
    }
  })
   */
  app.use('/secure', express.static(internalStaticPath));

  logger.log(`Static files path: ${staticPath}`);


  logger.log("Checking configuration...");
  const config = await getConfig()

  // HTTPS middleware
  const protocolIsSecure = (req: Request) => req.secure || req.get("X-Forwarded-Proto") === 'https';
  app.use(async (req, res, next) => {
    logger.log(`${req.method} ${req.url} ${req.ip}`)
    if (!protocolIsSecure(req) && !isHTTPSAvailable) {
      logger.warn(`This request (${req.ip}) is not secure. Sensitive data such as login credentials or access tokens can be intercepted.`)
      next()
    } else if (!protocolIsSecure(req) && isHTTPSAvailable) {
      logger.log(`Redirecting ${req.ip}'s insecure request to ${req.headers.host} to HTTPS... (${'https://' + req.headers.host + req.url})`)
      res.redirect(307, 'https://' + req.headers.host + req.url)
    } else {
      next()
    }
  });

  // JWT Middleware
  logger.log("Initializing JWT middleware");
  app.use(async (req, res, next) => {
    const token = req.header('x-access-token');
    if (!token) {
      req.isAuthenticated = false;
    } else {
      jwt.verify(token, (await getConfig()).secret, (error, decoded) => {
        if (error) {
          logger.warn('Error occurred whilst trying to verify user JWT: ', error);
          req.isAuthenticated = false
        } else {
          req.isAuthenticated = true
          req.tokenData = decoded as Request['tokenData']
        }
      })
    }
    next();
  });

  // API endpoints are stored in the routes folder. This should auto-import all of them.
  logger.log("Initializing API endpoints...")
  const routePath = path.join(__dirname, "/routes");
  for (const filename of fs.readdirSync(routePath)) await import(path.join(routePath, path.basename(filename)));

  // Error handling.
  logger.log('Initializing error handler middleware');
  app.use(function (err: Error, _: Request, res: Response, __: NextFunction) {
    logger.error(err.stack);
    res.status(500).json({result: false, message: 'Something happened with us while processing your request. Sorry!'});
  })

  // HTTPS / HTTP server starts
  logger.log(`HTTP - Binding to port ${process.env.PORT ?? config?.httpPort ?? 80}.`)
  http.createServer(app).listen(config?.httpPort).on('error', (err) => {
    logger.error(`Failed to bind to port ${config?.httpPort}: ` + err);
  });

  const privkeyLocation = path.join(process.env.CERT_PATH ?? '', 'privkey.pem')
  const certLocation = path.join(process.env.CERT_PATH ?? '', 'cert.pem')

  if (fs.existsSync(privkeyLocation) && fs.existsSync(certLocation)) {
    logger.log(`HTTPS certificates detected! Binding to port ${config?.httpsPort}.`)
    https.createServer({
      key: fs.readFileSync(privkeyLocation),
      cert: fs.readFileSync(certLocation),
    }, app)
      .listen(config?.httpsPort).on('error', (err) => {
        logger.error(`Failed to bind to port ${config?.httpsPort}: ` + err);
        isHTTPSAvailable = false;
      });
  } else {
    isHTTPSAvailable = false;
  }

  logger.success("Server start complete! Startup took " + (Date.now() - start) + "ms");
})();
