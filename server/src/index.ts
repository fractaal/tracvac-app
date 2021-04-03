const start = Date.now();

// Constants

// Libraries
import http from 'http';
import https from 'https';
import open from 'open';
import express, {NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import Logger from './logger';
import { getConfig } from "./config";
import * as database from './database';

// Middleware
import { json } from 'body-parser';
import fileUpload from "express-fileupload";
import cors from 'cors';

const logger = Logger('Main');
export const app = express();
export const staticPath = path.resolve(process.cwd(), 'static');
export const internalStaticPath = path.resolve(__dirname, '../', 'static')

// Use middleware
app.use(cors());
app.use(json());
app.use(fileUpload({
  limits: { fileSize: 1024 * 1024 }
}))

// Static
if (!fs.existsSync(staticPath)) fs.mkdirSync(staticPath);

const blocker = (_: Request, res: Response) => {
  res.status(401).send("You are not authorized");
}

app.get('/index.html', blocker);
app.get('/', blocker);

app.use(express.static(staticPath));
app.use(express.static(internalStaticPath));

logger.log(`Internal static files path: ${internalStaticPath}`);
logger.log(`Static files path: ${staticPath}`);

(async () => {
  logger.log("Reading configuration...");
  const config = await getConfig();

  if (!config) {
    await open(`http://localhost:${(await getConfig())?.httpPort ?? 80}/admin`);
  }

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

  /**
  // HTTPS middleware
  app.use(async (req, _, next) => {
    if (!req.secure) {
      logger.warn(`This request (${req.ip}) is not secure. Sensitive data such as login credentials or access tokens can be intercepted.
      To silence this warning, access your administrative interface at http://localhost:${(await getConfig())?.httpPort ?? 80}/admin or turn it off in settings.json.`)
    }
    next()
  });*/

  logger.log("Initializing database...");
  await database.connect();

  // API endpoints are stored in the routes folder. This should auto
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
  http.createServer(app).listen(process.env.PORT ?? config?.httpPort ?? 80).on('error', (err) => {
    logger.error(`Failed to bind to port ${config?.httpPort ?? 80}: ` + err);
  });


  if (fs.existsSync('key.pem') && fs.existsSync('cert.pem')) {
    logger.log(`HTTPS certificates detected! Binding to port ${config?.httpsPort ?? 443}.`)
    https.createServer({
      key: fs.readFileSync('key.pem'),
      cert: fs.readFileSync('cert.pem'),
    }, app).listen(config?.httpsPort ?? 443).on('error', (err) => {
      logger.error(`Failed to bind to port ${config?.httpsPort ?? 443}: ` + err);
    });
  }

  logger.success("Server start complete! Startup took " + (Date.now() - start) + "ms");
})();
