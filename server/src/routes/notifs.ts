import Logger from '../logger'
import { app } from '../'
import { getVapidKeys } from '../vapid';

const logger = Logger("Notifications")

app.get('/getVAPIDPublicKey', async (_, res) => {
  try {
    res.json({result: true, publicKey: getVapidKeys().vapidPublicKey});
  } catch(err) {
    logger.error(`Error attempting to get VAPID public key: ${err}`);
    res.status(500).json({result: false, message: 'Error attempting to get VAPID public key'});
  }
})

app.post('/saveSubscription', async (req, res) => {
  const pushSubscription = req.body as PushSubscriptionJSON;
  
})