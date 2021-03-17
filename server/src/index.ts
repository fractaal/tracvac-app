const start = Date.now();

// Constants
import { port, host } from './constants';
import { secret } from './secret';

// Libraries
import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import Logger from './logger';
import * as database from './database';

// Middleware
import { json } from 'body-parser';
import cors from 'cors';
import { TokenData } from './interfaces/TokenData';

const logger = Logger('Main');
export const app = express();

// Use middleware
app.use(cors());
app.use(json());

logger.log("Initializing JWT middleware"); 

app.use(function (req, res, next) {
  const token = req.header('x-access-token');
  if (!token) {
    req.isAuthenticated = false;
  } else {
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        logger.warn('Error occured whilst trying to verify user JWT: ', error);
        req.isAuthenticated = false
      } else {
        req.isAuthenticated = true
        req.tokenData = decoded as Request['tokenData']
      }
    })
  }
  next();
});


(async () => {
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
  
  logger.log(`Binding to port ${port} on ${host}...`)
  app.listen(port, host)
  
  logger.success("Server start complete! Startup took " + (Date.now() - start) + "ms");
})();