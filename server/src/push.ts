import { PushSubscriptionModel } from './database/models/PushSubscriptionModel'
import webpush from 'web-push'
import Logger from './logger'

const logger = Logger('Push')
export async function notifyUser(id: number, data: Record<string,any>) {
  logger.log(`Web push for ${id} commencing`)
  let success = true;
  const subs = await PushSubscriptionModel.query().select('*').where({userId: id})
  
  for (const sub of subs) {
    try {
      await webpush.sendNotification(sub.subscription as webpush.PushSubscription, JSON.stringify(data));
      logger.log(`Web push successful for user ${id} at sub id ${sub.id}`);
    } catch(err) {
      logger.warn(`Web push failed for user ${id} at sub id ${sub.id}: ${err}`);
      await deleteSubscription(sub.id)
      success = false
    }
  }

  return success;
}

export async function deleteSubscription(subscriptionId: number) {
  try {
    const numDeleted = await PushSubscriptionModel.query().deleteById(subscriptionId)
    logger.log(`Delete sub id ${subscriptionId}: Deleted ${numDeleted} subscriptions`)
  } catch(err) {
    logger.warn(`Delete sub id ${subscriptionId} failed: ${err}`)
  }
}