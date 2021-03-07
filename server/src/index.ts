const start = Date.now();

import express from 'express';
import Logger from './logger';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import * as database from './database';

const logger = Logger('Main');
const app = express();

app.use(bodyParser.json());

// Database models.
import UserModel from './database/models/User';

(async () => {
  logger.log("Initializing database...");
  await database.connect();

  logger.log("Initializing API endpoints...")
  app.post('/user', async (req, res) => {
    req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt());
    for (const key in req.body) {
      if (key.toLowerCase().indexOf('date') !== -1) {
        req.body[key] = new Date(parseInt(req.body[key]) * 1000);
      }
    }
    logger.warn(JSON.stringify(await UserModel.query().insert({
      ...req.body
    })));
    res.status(200);
    res.send("fuck you");
  })

  app.post('/login', async (req, res) => {
    const match = await (await UserModel.query()).find(user =>user.username === req.body.username)
    if (match) {
      if (await bcrypt.compare(req.body.password, match.password)) {
        res.send("login yes!");
      } else {
        res.send('incorrect pass');
      }
    }
  })
  
  logger.log("Binding to port...")
  app.listen(3000);
  
  logger.success("Server start complete! Startup took " + (Date.now() - start) + "ms");
})();

