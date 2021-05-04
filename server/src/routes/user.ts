import Logger from '../logger';
import { app } from '../';
import bcrypt from 'bcryptjs';
import { UserModel } from '../database/models/UserModel';
import {userValidator} from "../validation";

const logger = Logger('User Route');

// Registration route
app.post('/user', async (request, response) => {
  try {

    // const match = await (await UserModel.query()).find(user => user.username === req.body.username)
    const match = await UserModel.query().findOne({username: request.body.username})
    if (match) {
      response.status(200);
      response.json({ result: false, message: `Username ${match.username} is already taken. Try another one!` });
      logger.log(`Registration request for ${request.ip} failed - username taken`);

    } else {
      try {
        // validate username, email, and dates
        // Username must not have spaces in it
        // Email must be valid
        // date of birth and covid date must be valid dates
        const [isValid, message] = userValidator(request.body as UserModel, "register");
        if (!isValid) {
          response.status(400).json({result: false, message});
          return;
        }

        request.body.password = await bcrypt.hash(request.body.password, await bcrypt.genSalt());

        await UserModel.query().insert({
          ...request.body
        });

      } catch(err) {

        // Something's wrong with the user's request.
        logger.log(`Registration request for ${request.ip} failed - ${err}`);

        response.status(400).json({
          result: false,
          message: 'There was something wrong with your request while trying to register you.'
        })
        return;

      }

      response.status(200).json({result: true, message: 'Registration successful!'});
      logger.log(`Registration request for ${request.ip} succeeded`);

    }
  } catch(err) {

    response.status(500).json({
      result: false,
      message: 'Something happened while trying to register you.'
    })
    logger.error(`Registration request for ${request.ip} failed - ${err}`);

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

  // We don't want them to inadvertently (or intentionally) change their username, password or email
  delete request.body.username;
  delete request.body.password;
  delete request.body.email;

  const [isValid, message] = userValidator(request.body as UserModel, 'update');

  if (!isValid) {
    response.status(400).json({result: false, message});
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

app.post('/changePassword', async (req, res) => {
  if (req.isAuthenticated) {
    const match = await UserModel.query().findById(req.tokenData.userId);
    if (req.body.oldPassword && req.body.newPassword) {
      if (await bcrypt.compare(req.body.oldPassword, match.password)) {
        // Fix: Don't update password for everyone
        await UserModel.query()
          .where({id: req.tokenData.userId})
          .patch({password: await bcrypt.hash(req.body.newPassword, await bcrypt.genSalt())});
        
        logger.log(`User ${match.username} succeeded in a password change.`);
        res.json({result: true, message: 'Password changed!'});
        return;

      } else {
        logger.log(`User ${match.username} requested password change, but did not input the correct password.`);
        res.status(400).json({result: false, message: 'Password incorrect!'});
        return;
      }
    } else {
      res.status(400).json({result: false, message: 'Missing params'});
    }
  } else {
    logger.warn(`${req.ip} requested password change but is not logged in.`);
    res.status(400).json({result: false, message: 'You are not authenticated'})
  }
})
