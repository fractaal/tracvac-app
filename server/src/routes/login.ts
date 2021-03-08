import Logger from '../logger';
import { app } from '../';
import bcrypt from 'bcrypt';
import { UserModel } from '../database/models/UserModel';

const logger = Logger('Login-Route');

// Login route
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
