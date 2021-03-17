import Logger from '../logger';
import { app } from '../';

const logger = Logger('Reception-Route');

app.get('/reception', (_, res) => {
  try {
    res.json({
      version: require('../../package.json').version,
      name: `Test`,
      description: `Wow.`,
    }); 
  } catch(err) {
    logger.error(`Something happened while trying to send ${_.ip} reception data - ${err.stack}`);
  }
})