const start = Date.now();

import express from 'express';
import Logger from './logger';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import * as database from './database';

const logger = Logger('Main');
const app = express();

// Use bodyParser
app.use(bodyParser.json());

// Database models.
import UserModel from './database/models/User';

(async () => {
  logger.log("Initializing database...");
  await database.connect();

  logger.log("Initializing API endpoints...")

  // Registration route POST USER
  app.post('/user', async (req, res) => {
    try {
      const match = await (await UserModel.query()).find(user => user.username === req.body.username)
      if (match) {
        res.status(200);
        res.json({
          result: false,
          message: `Username ${match.username} is already taken. Try another one!`
        });
        logger.log(`Registration request for ${req.ip} failed - username taken`);
      } else {
        req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt());
        for (const key in req.body) {
          if (key.toLowerCase().indexOf('date') !== -1) {
            req.body[key] = new Date(parseInt(req.body[key]) * 1000);
          }
        }

        await UserModel.query().insert({
          ...req.body
        });
  
        res.status(200);
        res.json({
          result: true,
          message: 'Registration successful!'
        });

        logger.log(`Registration request for ${req.ip} succeeded`);
      }

    } catch(err) {
      res.status(500);
      res.json({
        result: false,
        message: 'Something happened while trying to register you.'
      })
      logger.error(`Registration request for ${req.ip} failed - ${err}`);
    }
  })

  // Login route POST LOGIN
  app.post('/login', async (req, res) => {
    const match = await (await UserModel.query()).find(user => user.username === req.body.username)
    if (match) {
      if (await bcrypt.compare(req.body.password, match.password)) {
        res.json({
          result: true,
          message: 'Login successful!'
        });
        logger.log(`Login for ${req.body.username} from ${req.ip} succeeded`);
      } else {
        res.json({
          result: false,
          message: 'Login failed!'
        })
        logger.log(`Login for ${req.body.username} from ${req.ip} failed - passwords don't match`);
      }
    } else {
      res.json({
        result: false,
        message: 'Login failed! User does not exist.'
      });
      logger.log(`Login from ${req.ip} failed - username does not exist (${req.body.username})`);
    }
  })
  
  logger.log("Binding to port...")
  app.listen(3000);
  
  logger.success("Server start complete! Startup took " + (Date.now() - start) + "ms");
})();

