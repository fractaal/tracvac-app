import Logger from '../logger';
import { app } from '../';
import bcrypt from 'bcryptjs';
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

app.patch('/user', async (request, response) => {
  if (!request.isAuthenticated) {
    response.json({result: false, message: 'You are not authenticated'});
    return;
  }

  if (!request.tokenData?.userId) {
    response.json({result: false, message: 'Please reauthenticate'});
    return;
  }

  if (request.body.username) delete request.body.username;
  if (request.body.password) delete request.body.password;
  if (request.body.email) delete request.body.email;

  for (const key in request.body) {
    if (key.toLowerCase().indexOf('date') !== -1) {
      request.body[key] = new Date(request.body[key]);
    }
  }

  try {
    await UserModel.query().where({id: request.tokenData.userId}).patch(request.body);
    logger.log(`User ${request.body.username} updated their personal information with ${JSON.stringify(request.body, null, 2)}`)
    response.json({result: true, message: 'Update successful!'});
  } catch(e) {
    logger.error(`Error while trying to update user ${request.tokenData.userId} - ${e}`);
    response.json({result: false, message:  'Something happened while trying to update your personal information'})
  }
})

// Get user info
app.get('/user', async (req, res) => {
  if (req.isAuthenticated) {
    if (req.tokenData.userId) {
      const match: Record<string, any>|undefined = await (await UserModel.query()).find(user => user.id === req.tokenData.userId);
      if (match) {
        delete match.password;
        res.json({ result: true, user: match });
      } else {
        logger.warn(`An authenticated user ${req.tokenData.userId} requested their user info, but they weren't found in the database...`);
        res.json({ result: false, message: 'User not found' })
      }
    } else {
      logger.warn(`An authenticated user ${req.tokenData.userId} (probably) has an outdated access token, please relog.`);
      res.status(400).json({ result: false, message: 'Please reauthenticate' })
    }
  } else {
    logger.warn(`IP ${req.ip} requested user info but is not logged in.`)
    res.status(400).json({ result: false, message: 'You are not authenticated' });
  }
})
