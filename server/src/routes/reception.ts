import Logger from '../logger';
import { app } from '../';
import {getConfig} from "../config";

const logger = Logger('Reception-Route');

app.get('/reception', async (req, res) => {
  try {
    const config = await getConfig()
    res.json({
      version: require('../../package.json').version,
      location: config.location,
      lguUrl: config.lguUrl
    });
  } catch(err) {
    logger.error(`Something happened while trying to send ${req.ip} reception data - ${err.stack}`);
  }
})
