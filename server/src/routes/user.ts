import Logger from '../logger';
import { app } from '../';
import bcrypt from 'bcryptjs';
import { UserModel } from '../database/models/UserModel';
import {validateDate, validateEmail, validateNumber, validateUsername} from "../validation";

const logger = Logger('User-Route');

// Registration route
app.post('/user', async (req, res) => {
  try {

    // const match = await (await UserModel.query()).find(user => user.username === req.body.username)
    const match = await UserModel.query().findOne({username: req.body.username})
    if (match) {
      res.status(200);
      res.json({ result: false, message: `Username ${match.username} is already taken. Try another one!` });
      logger.log(`Registration request for ${req.ip} failed - username taken`);

    } else {
      try {
        // validate username, email, and dates
        // Username must not have spaces in it
        // Email must be valid
        // date of birth and covid date must be valid dates
        if (!validateUsername(req.body.username)) {
          res.status(400).json({result: false, message: "Your username is invalid."});
          return;
        } else if (!validateEmail(req.body.email)) {
          res.status(400).json({result: false, message: "Your email is invalid."});
          return;
        } else if (!validateDate(req.body.dateOfBirth)) {
          res.status(400).json({result: false, message: "Your birth date is invalid."});
          return;
        } else if ((req.body.covidDate !== null || true) && !validateDate(req.body.covidDate)) {
          res.status(400).json({result: false, message: "Your COVID date is invalid."});
          return;
        } else if (!validateNumber(req.body.contactNumber) || !validateNumber(req.body.employerContactNumber)) {
          res.status(400).json({result: false, message: "Contact numbers are invalid."});
          return;
        }

        req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt());

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

  // We don't want them to inadvertently (or intentionally) change their username, password or email
  if (request.body.username) delete request.body.username;
  if (request.body.password) delete request.body.password;
  if (request.body.email) delete request.body.email;


  if (!validateDate(request.body.dateOfBirth)) {
    response.status(400).json({result: false, message: "Your birth date is invalid."});
    return;
  } else if ((request.body.covidDate !== null || true) && !validateDate(request.body.covidDate)) {
    response.status(400).json({result: false, message: "Your COVID date is invalid."});
    return;
  } else if (!validateNumber(request.body.contactNumber) || !validateNumber(request.body.employerContactNumber)) {
    response.status(400).json({result: false, message: "Contact numbers are invalid."});
    return;
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
