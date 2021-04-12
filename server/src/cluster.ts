
require('dotenv').config()

import cluster from 'cluster';
import os from 'os';
import Logger from './logger';
import * as database from './database';
import { isProperlyConfigured, getConfig } from "./config";
import open from "open";

let forksBeforeStop = 5;

(async () => {
    if (cluster.isMaster) {
        const logger = Logger("Master");
        logger.log("Initializing database...")
        await database.connect()

        const cpuCount = os.cpus().length
        logger.log(`Forking ${(process.env.THREAD_COUNT ?? cpuCount)} worker processes...`)
        for (let i = 0; i < (process.env.THREAD_COUNT ?? cpuCount); i++) {
            cluster.fork()
        }

        cluster.on('worker-1-ready', async () => {
            if (!(await isProperlyConfigured())) {
                try {
                    await open(`http://localhost:${(await getConfig())?.httpPort}/admin`)
                } catch(err) {
                    logger.error(`
                  Opening browser for configuration failed: ${err.stack}
                  You must use environment variables to set Tracvac Server up.
                  `)
                    process.exit(1);
                }
            }
        })

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

