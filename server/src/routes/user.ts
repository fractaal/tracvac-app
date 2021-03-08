import Logger from '../logger';
import { app } from '../';
import bcrypt from 'bcrypt';
import { UserModel } from '../database/models/UserModel';

const logger = Logger('User-Route');

// Registration route
app.post('/user', async (req, res) => {
  try {

    const match = await (await UserModel.query()).find(user => user.username === req.body.username)
    if (match) {

      res.status(200);
      res.json({ result: false, message: `Username ${match.username} is already taken. Try another one!` });
      logger.log(`Registration request for ${req.ip} failed - username taken`);

    } else {

      try {

        req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt());
        for (const key in req.body) {
          if (key.toLowerCase().indexOf('date') !== -1) {
            req.body[key] = new Date(parseInt(req.body[key]) * 1000);
          }
        }

        await UserModel.query().insert({
          ...req.body
        });

      } catch(err) {

        // Something's wrong with the user's request.
        logger.log(`Registration request for ${req.ip} failed - ${err}`);

        res.status(400);
        res.json({
          result: false,
          message: 'There was something wrong with your request while trying to register you.'
        })
        return;

      }
      
      res.status(200);
      res.json({result: true, message: 'Registration successful!'});
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