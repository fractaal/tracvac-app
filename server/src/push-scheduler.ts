import Logger from './logger'
import { notifyUser } from './push'
const logger = Logger('PushScheduler');

export interface PushQueueItem<T> {
  userId: number;
  data: T
}

const queue: PushQueueItem<Record<string,any>>[] = [];
const maxItemsEachPass = 500;

export function enqueue<T>(userId: number, data: T) {
  queue.push({data, userId});
}

(async () => {
    while (true) {
      await new Promise(r => setTimeout(r, 10000))
      if (queue.length === 0) continue;
      
      const startTime = Date.now();
      const active = queue.splice(0, maxItemsEachPass)
      const promises: Promise<boolean>[] = [];

      logger.log(`Performing scheduler pass on ${active.length} pending pushes`);
      
      for (const item of active) promises.push(notifyUser(item.userId, item.data));
      await Promise.all(promises)

      let successes = 0
      let failures = 0
      for (const promise of promises) (await promise) ? successes++ : failures++

      logger.log(`Scheduler pass complete on ${active.length} pushes with ${successes} successes and ${failures} failures`)
    }
})();