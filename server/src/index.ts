const start = Date.now();

import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import Logger from './logger';
import bodyParser from 'body-parser';
import * as database from './database';

const logger = Logger('Main');
export const app = express();

// Use bodyParser
app.use(bodyParser.json());

(async () => {
  logger.log("Initializing database...");
  await database.connect();

  logger.log("Initializing API endpoints...")
  const routePath = path.join(__dirname, "/routes");
  for (const filename of fs.readdirSync(routePath)) await import(path.join(routePath, path.basename(filename)));

  app.use((err: Error, _: Request, res: Response) => {
    logger.error(err.stack);
    res.status(500).json({result: false, message: 'Something happened with us while processing your request. Sorry!'});
  })
  
  logger.log("Binding to port...")
  app.listen(3000);
  
  logger.success("Server start complete! Startup took " + (Date.now() - start) + "ms");
})();
