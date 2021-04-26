
require('dotenv').config()

import { getConfig } from "./config";
import cluster from 'cluster';
import os from 'os';
import Logger from './logger';
import * as database from './database';
import * as vapid from './vapid';

let forksBeforeStop = 5;

(async () => {
    if (cluster.isMaster) {
        const logger = Logger("Master");
        logger.log("Reading config...")
        await getConfig()
        logger.log("Initializing database...")
        await database.connect()

        // Init VAPID / Push notif stuff
        await vapid.initialize()

        const cpuCount = os.cpus().length
        logger.log(`Forking ${(process.env.THREAD_COUNT ?? cpuCount)} worker processes...`)
        for (let i = 0; i < (process.env.THREAD_COUNT ?? cpuCount); i++) {
            cluster.fork()
        }

        cluster.on('exit', (worker) => {
            if (forksBeforeStop > 0) {
                logger.error(
                    `Worker ${worker.id} has crashed! Forking another worker... 
                ${forksBeforeStop} forks remaining before Tracvac Server exits.
                `)
                forksBeforeStop--
                cluster.fork()
            } else {
                logger.error(
                    `CRASH! CRASH! CRASH!`
                )
                process.exit(1);
            }
        })
    }
    else {
        import('./index');
    }
})();

