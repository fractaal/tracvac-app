import { PushSubscriptionModel } from './database/models/PushSubscriptionModel'
import webpush from 'web-push'
import Logger from './logger'

const logger = Logger('Push')
export async function notifyUser(id: number, data: Record<string,any>) {
  const subs = await PushSubscriptionModel.query().select('*').where({id})
  for (const sub of subs) {
    try {
      await webpush.sendNotification(sub.subscription as webpush.PushSubscription, JSON.stringify(data));
      logger.log(`web push successful for ${sub.userId}`);
    } catch(err) {
      logger.error(`web push failed! ${err}`);
    }
  }
}