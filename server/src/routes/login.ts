import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Logger from '../logger';
import { app } from '../';
import { UserModel } from '../database/models/UserModel';
import { secret } from '../secret';

const logger = Logger('Login-Route');

// Login route
app.post('/login', async (req, res) => {
  try {
    const user = await (await UserModel.query()).find(user => user.username === req.body.username)
    if (user) {
      if (await bcrypt.compare(req.body.password, user.password)) {
        // Create JWT and send back to person
        try {
          let token = jwt.sign({
            userId: user.id,
          }, secret, {expiresIn: '168h'})

          logger.log(`Login for ${req.body.username} from ${req.ip} succeeded`);
          res.json({ result: true, message: 'Login successful!', token });

        } catch(err) {
          res.status(500).json({ result: false, message: `Something happened on our side!`});
        }
      } else {
        res.json({ result: false, message: 'Login failed!' })
        logger.log(`Login for ${req.body.username} from ${req.ip} failed - passwords don't match`);
      }
    } else {
      res.json({result: false, message: `There's no such user with that name.`});
      logger.log(`Login from ${req.ip} failed - username does not exist (${req.body.username})`);
    }
  } catch(err) {
    res.status(500).json({ result: false, message: `Something happened on our side!` });
  }
})
