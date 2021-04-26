import { knex } from './database';
import Logger from './logger';
import webpush from 'web-push';
import { getConfig } from './config';

const logger = Logger("VAPID")

let vapidPublicKey: string;
let vapidPrivateKey: string;

export function getVapidKeys() {
  return {
    vapidPrivateKey, vapidPublicKey
  }
}

export async function initialize() {
  try {
    vapidPublicKey = (await knex('metadata').where({key: "vapidPublicKey"}).first().then()).value
    vapidPrivateKey = (await knex('metadata').where({key: "vapidPrivateKey"}).first().then()).value
  } catch (err) {
    // Keys must not exist, therefore must generate new ones
    logger.log("Generating VAPID keys...");
    const keys = webpush.generateVAPIDKeys()
    await knex.insert({key: 'vapidPublicKey', value: keys.publicKey}).into('metadata');
    await knex.insert({key: 'vapidPrivateKey', value: keys.privateKey}).into('metadata');
  }

  webpush.setVapidDetails(
    `mailto:${(await getConfig()).email}`,
    vapidPublicKey,
    vapidPrivateKey
  )
}