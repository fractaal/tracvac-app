const start = Date.now();

// Libraries
import morgan from "morgan"
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
import { UserModel } from './database/models/UserModel';

const logger = Logger(`Index`);
export const app = express();
export const staticPath = path.resolve(process.cwd(), 'public')
export const internalStaticPath = path.join(__dirname, '../static')
export const frontEndPath = path.join(__dirname, '../app')

let isHTTPSAvailable = true;

// Write exception logs to disk
const exceptionLogger = (error: Error) => {
  logger.error(error.stack)
  fs.writeFileSync(path.resolve(process.cwd(), `${Date.now()}-error.log`), error.stack as string, {encoding: 'utf-8'});
  // process.exit(1);
}

process.on('uncaughtException', exceptionLogger)
process.on('unhandledRejection', exceptionLogger)

// Use middleware
app.use(cors());
app.use(json({limit: '10mb'}));
app.use(fileUpload({
  limits: { fileSize: 1024 * 1024 },
  abortOnLimit: true
}))

// Create static folder if it doesn't exist already
if (!fs.existsSync(staticPath)) fs.mkdirSync(staticPath);


(async () => {
  // Access logging.
  app.use(morgan("combined", {stream: fs.createWriteStream(path.resolve(process.cwd(), 'access.log'), { flags: 'a' })}))
  
  // Public paths
  app.use('/public', express.static(staticPath));
  app.use('/public', express.static(path.join(__dirname, '../public')));

  // Application path
  app.use('/app', express.static(frontEndPath));
  app.use('/', express.static(frontEndPath));


  logger.log(`Static files path: ${staticPath}`);


  logger.log("Checking configuration...");
  const config = await getConfig()

  // HTTPS middleware
  /* Because of the changes, we don't actually need this anymore.
  const protocolIsSecure = (req: Request) => req.secure || req.get("X-Forwarded-Proto") === 'https';
  app.use(async (req, res, next) => {
    logger.log(`(S:${req.secure}) ${req.method} ${req.url} - ${req.ip}`)
    if (!protocolIsSecure(req) && !isHTTPSAvailable) {
      logger.warn(`This request (${req.ip}) is not secure. Sensitive data such as login credentials or access tokens can be intercepted.`)
      next()
    } else if (!protocolIsSecure(req) && isHTTPSAvailable) {
      logger.log(`Redirecting ${req.ip}'s insecure request to ${req.headers.host} to HTTPS... (${'https://' + req.headers.host + req.url})`)
      res.redirect(302, 'https://' + req.headers.host + req.url)
    } else {
      next()
    }
  });
  */

 // JWT Middleware
  logger.log("Initializing JWT middleware");
  app.use(async (req, res, next) => {
    const token = req.header('x-access-token');
    if (!token) {
      req.isAuthenticated = false;
    } else {
      const unverifiedToken = jwt.decode(token) as Partial<Request['tokenData']>;
      if (unverifiedToken?.userId) {
        const secret = (await UserModel.query().select('password').where({id: unverifiedToken.userId}))[0]?.password;
        if (secret) {
          jwt.verify(token, secret, (error, decoded) => {
            if (error) {
              logger.warn('Error occurred whilst trying to verify user JWT: ', error);
              req.isAuthenticated = false
            } else {
              req.isAuthenticated = true
              req.tokenData = decoded as Request['tokenData']
            }
          })
        } else {
          logger.warn(`JWT contains a user ID (${unverifiedToken.userId}) key but that user is not present in database.`)
          req.isAuthenticated = false;
        }
      } else {
        logger.warn(`JWT from ${req.ip} does not contain user ID!`)
        req.isAuthenticated = false;
      }

    }
    next();
  });

  // API endpoints are stored in the routes folder. This should auto-import all of them.
  logger.log("Initializing API endpoints...")
  const routePath = path.join(__dirname, "/routes");
  for (const filename of fs.readdirSync(routePath)) await import(path.join(routePath, path.basename(filename)));

  // Load plugins!
  await import('./plugins')
  
  // Error handling.
  logger.log('Initializing error handler middleware');
  app.use(function (err: Error, _: Request, res: Response, __: NextFunction) {
    logger.error(err.stack);
    res.status(500).json({result: false, message: 'Something happened with us while processing your request. Sorry!'});
  })

  // HTTPS / HTTP server starts
  const startHttp = () => {
    logger.log(`HTTP: Binding to port ${process.env.PORT ?? config?.httpPort ?? 80}.`)
    http.createServer(app).listen(config?.httpPort).on('error', (err) => {
      logger.error(`Failed to bind to port ${config?.httpPort}: `, err.stack);
    });
  }

  const privkeyLocation = process.env.KEY_PATH ?? "NONE"
  const certLocation = process.env.CERT_PATH ?? "NONE"

  if (fs.existsSync(privkeyLocation) && fs.existsSync(certLocation)) {
    logger.log(`HTTPS: Certificates detected! Binding to port ${config?.httpsPort}.`)
    https.createServer({
      key: fs.readFileSync(privkeyLocation),
      cert: fs.readFileSync(certLocation),
    }, app)
      .listen(config?.httpsPort).on('error', (err) => {
        logger.error(`Failed to bind to port ${config?.httpsPort}: `, err.stack);
        isHTTPSAvailable = false;
        startHttp()
      });
    logger.log(`HTTPS: Starting minimal HTTP server for redirection.`)
    express().all('*', (req, res) => res.redirect(302, 'https://' + req.headers.host + req.url)).listen(config?.httpPort)
  } else {
    isHTTPSAvailable = false;
    startHttp()
  }

  logger.success("Server start complete! Startup took " + (Date.now() - start) + "ms");
})();
