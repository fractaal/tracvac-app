import Logger from '../logger'
import { app } from '../'
import { getVapidKeys, initialize } from '../vapid';
import { PushSubscriptionModel } from '../database/models/PushSubscriptionModel'

import webpush from 'web-push'

const logger = Logger("Notifications")

initialize().then(() => {
  app.get('/getVAPIDPublicKey', async (req, res) => {
    if (req.isAuthenticated) {
      console.log(getVapidKeys());
      try {
        res.json({result: true, publicKey: getVapidKeys().vapidPublicKey});
      } catch(err) {
        logger.error(`Error attempting to get VAPID public key: ${err}`);
        res.status(500).json({result: false, message: 'Error attempting to get VAPID public key'});
      }
    } else {
      res.status(400).json({result: false, message: 'You are not authenticated'});
    }
  })

  app.post('/saveSubscription', async (req, res) => {
    if (req.isAuthenticated) {

      const pushSubscription = {endpoint: req.body.endpoint, expirationTime: req.body.expirationTime, keys: req.body.keys} as PushSubscriptionJSON;

      const subscriptions = await PushSubscriptionModel.query().select('*').where({userId: req.tokenData.userId, token: req.header('x-access-token')});

      console.log(req.body)
      console.log(pushSubscription, subscriptions)

      if (subscriptions.length === 0) {
        logger.log(`Creating new subscription for user ${req.tokenData.userId}`)
        // No existing subscriptions.
        await PushSubscriptionModel.query().insert({
          subscription: pushSubscription, 
          userId: req.tokenData.userId, 
          token: req.header('x-access-token')
        })      
      } else {
        logger.log(`Updating existing subscription for user ${req.tokenData.userId}`)
        // Update existing subscription.
        await PushSubscriptionModel.query().where({userId: req.tokenData.userId, token: req.header('x-access-token')}).patch({
          subscription: pushSubscription,
        })
      }
      
      res.json({result: true, message: "Successfully saved subscription."});
      
    } else {
      res.status(400).json({result: false, message: `You are not authenticated.`})
    }
  })

  // Test endpoint ! ! !
  app.get('/test', async (req, res) => {
    const subs = await PushSubscriptionModel.query().select('*');

    for (const sub of subs) {
      try {
        await webpush.sendNotification(sub.subscription as webpush.PushSubscription, JSON.stringify({type: 'vaccine'}));
        logger.log(`web push successful for ${sub.userId}`);
      } catch(err) {
        logger.error(`web push failed! ${err}`);
      }
    }

    res.send('done');
  })
})
