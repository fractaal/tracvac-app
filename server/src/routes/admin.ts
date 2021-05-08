import { app } from "../index"
import { mkdtemp } from 'fs/promises'
import path from 'path'
import os from 'os'
import Logger from '../logger'
import { raw } from 'objection'
import { NotificationModel } from "../database/models/NotificationModel"
import { UserModel } from "../database/models/UserModel"
import { LogModel } from "../database/models/LogModel"
import { getConfig, Config } from "../config"
import expressBasicAuth from "express-basic-auth"
import ExcelJS from 'exceljs'
import registrationFormTemplate from "../database/templates/registrationFormTemplate"
import * as PushScheduler from '../push-scheduler'
import { PushSubscriptionModel } from "../database/models/PushSubscriptionModel"

const logger = Logger("Administrator Route");

/**
const adminCheckerMiddleware = (request: Request, response: Response, next: NextFunction) => {
    if (request.socket.localAddress === request.socket.remoteAddress) {
        // logger.log('Admin routes have been accessed.');
        next();
    } else {
        logger.warn(`An attempt to access the administrator interface was made from ${request.socket.remoteAddress}`)
        response.status(401).json({result: false, message: "You are not authorized"});
    }
};
*/

(async () => {
    app.use('/admin/*', expressBasicAuth({users: {admin: (await getConfig()).adminPassword}, challenge: true}))
    app.use('/admin', expressBasicAuth({users: {admin: (await getConfig()).adminPassword}, challenge: true}))
    app.get('/admin', (request, response) => {
        response.redirect('/secure')
    })

    app.get('/admin/setup', async (request, response) => {
        const config: Partial<Config> = await getConfig();
        response.json({
            ...config
        })
    })

    app.get('/admin/getUser/:id', async (req, res) => {
        try {
            const user = await UserModel.query().findById(req.params.id) as UserModel | null

            if (user) {
                res.json({result: true, data: user})
            } else {
                res.status(400).json({result: false, message: `User doesn't exist.`})
            }
        } catch(err) {
            logger.error(err)
            res.status(500).json({result: false, message: `Server error occurred while trying to get user`})
        }
    })

    app.post('/admin/getUsers', async (request, response) => {
        if (request.body.pageSize === 0) request.body.pageSize = 1000;
        if (
            request.body.pageSize !== undefined &&
            request.body.page !== undefined &&
            request.body.orderBy !== undefined &&
            request.body.ascending !== undefined
        ) {
            let result;
            if (request.body.filter) {
                result = await UserModel.query()
                    .select('*')
                    .where(
                        raw("CONCAT(\"firstName\", \"middleName\", \"lastName\")"),
                        'LIKE',
                        `%${request.body.filter}%`
                    ).where(
                        (() => {
                            const where = {} as Record<string,any>;
                            if (request.body.showPUMs) where.isPUM = true;
                            if (request.body.showPUIs) where.isPUI = true;
                            return where
                        })()
                    ).orderBy(request.body.orderBy, request.body.ascending ? 'asc' : 'desc')
                    .page(parseInt(request.body.page), parseInt(request.body.pageSize));
            } else {
                result = await UserModel.query()
                    .where(
                        (() => {
                            const where = {} as Record<string,any>;
                            if (request.body.showPUMs) where.isPUM = true;
                            if (request.body.showPUIs) where.isPUI = true;
                            return where
                        })()
                    ).orderBy(request.body.orderBy, request.body.ascending ? 'asc' : 'desc')
                    .page(parseInt(request.body.page), parseInt(request.body.pageSize));
            }
            response.json(result);
        } else {
            response.status(400).json({result: false, message: 'Missing params'})
        }
    })

    app.post('/admin/editUser', async (request, response) => {
        if (request.body.data) {
            for (const user of request.body.data as Partial<UserModel>[]) {
                if (
                    user.id === undefined &&
                    user.isVaccinated === undefined &&
                    user.vaccineManufacturer === undefined &&
                    user.isVaccineReady === undefined &&
                    user.isPUM === undefined &&
                    user.isPUI === undefined &&
                    user.dosageNumber === undefined
                ) response.status(400).json({result: false, message: "Missing parameters."})
            }

            try {
                await UserModel.transaction(async (trx) => {
                    for (const user of request.body.data as Partial<UserModel>[]) {

                        // Updating lastVaccinationTime
                        const oldUser = await UserModel.query(trx).where({ id: user.id }).select('isVaccinated')
                        if (!oldUser[0].isVaccinated && user.isVaccinated) {
                            await UserModel.query(trx).where({ id: user.id }).patch({lastVaccinationTime: new Date().toUTCString()})
                        }

                        await UserModel.query(trx).where({ id: user.id }).patch({
                            isVaccinated: !!user.isVaccinated,
                            vaccineManufacturer: user.vaccineManufacturer,
                            isVaccineReady: user.isVaccineReady,
                            isPUI: !!user.isPUI,
                            isPUM: !!user.isPUM,
                            dosageNumber: user.dosageNumber
                        });
                        // Queue a push to be handled by the push scheduler 
                        PushScheduler.enqueue(user.id as number, {title: "Your vaccine/vaccination status has changed!", message: "You might want to check it out!"})
                    }
                })
                logger.log(`Committed changes to ${request.body.data.length} people`)
                response.json({result: true, message: "Changes committed!"})
            } catch (err) {
                logger.error(`Error occurred while updating users: ${err}`)
                response.status(500).json({result: false, message: 'Something happened while trying to update the users. The changes have not been committed.'});
            }

        }
    })

    app.post('/admin/getNotifications', async (request, response) => {
        if (request.body.pageSize !== undefined && request.body.page !== undefined) {
            const result = await NotificationModel.query().select('*');

            response.json(result);
        } else {
            response.status(400).json({result: false, message: 'Missing page/pageSize params'})
        }
    })

    app.post('/admin/postNotification', async (request, response) => {
        if (
            request.body.title &&
            request.body.content
        ) {
            try {
                const notifToAdd: Record<string, string> = {
                    title: request.body.title,
                    content: request.body.content,
                }
                if (request.body.subtitle) notifToAdd.subtitle = request.body.subtitle;
                await NotificationModel.query().insert(notifToAdd);

                // Notify all users
                const userIds = await UserModel.query().select('id')
                for (const user of userIds) {
                    PushScheduler.enqueue(user.id, {title: request.body.title, message: "New LGU notification"});
                }

                logger.log(`New notification ${notifToAdd.title} added`)
                response.json({result: true, message: 'Notification posted!'});
            } catch (e) {
                response.status(500).json({result: false, message: `Server side error: ${e}`});
            }
        } else {
            response.status(400).json({result: false, message: "Missing title / content"});
        }
    })

    app.post('/admin/deleteNotification', async (request, response) => {
        if (request.body.notificationId) {
            try {
                await NotificationModel.query().deleteById(request.body.notificationId);
                logger.log(`Deleted notification ${request.body.notificationId}`)
                response.json({result: true});
            } catch(e) {
                response.status(500).json({result: false, message: 'Something happened while trying to delete the notification.'});
            }
        } else {
            response.status(400).json({result: false, message: "Notification ID missing"});
        }
    })

    app.post('/admin/viewLogs', async (request, response) => {
        if (request.body.userId) {
            try {
                const result = await LogModel.query().select('*').where({userId: request.body.userId}).orderBy('createdAt', 'desc');
                logger.log(`Returning logs for user ${request.body.userId}`)
                response.json({result: true, data: result});
            } catch(err) {
                logger.error(`Notification retrieval for user ${request.body.userId} failed: ${err}`)
                response.status(500).json({result: false, message: "Something happened while trying to retrieve notifications"})
            }
        } else {
            response.status(400).json({result: false, message: "User ID missing"});
        }
    })

    app.get('/admin/export', async (request, response) => {
        const start = Date.now();
        logger.log(`Performing user data export!`)

        let workbook: ExcelJS.Workbook;
        let sheet: ExcelJS.Worksheet;

        try {

            workbook = new ExcelJS.Workbook();

            workbook.creator = "Tracvac";
            workbook.created = new Date();
            workbook.modified = new Date();

            sheet = workbook.addWorksheet("people");

            const columns = [];

            for (const section of registrationFormTemplate) {
                for (const formItem of section.formItems) {
                    if (formItem.name === 'password') continue;
                    columns.push({
                        header: formItem.displayName,
                        key: formItem.name
                    })
                }
            }

            sheet.columns = columns; // Fix column.equivalentTo is undefined

        } catch(err) {
            logger.error(`Error occurred while initializing the workbook: ${err}`);
            response.status(500).json({
                result: false,
                message: `Error occurred while initializing the workbook: ${err}`
            })
            return;
        }

        let allUsers: UserModel[];

        try {
            allUsers = await UserModel.query().select('*');
        } catch (err) {
            logger.error(`Error occurred while querying the database: ${err}`);
            response.status(500).json({
                result: false,
                message: `Error occurred while querying the database: ${err}`
            })
            return;
        }

        try {
            for (const user of allUsers) {
                sheet.addRow(user);
            }

            const folder = await mkdtemp(path.join(os.tmpdir(), 'tracvac-export-'))
            const filePath = path.join(folder, `export-${Date.now()}.xlsx`)
            await workbook.xlsx.writeFile(filePath);

            logger.success(`User data export complete.`)
            logger.success(`Took ${Date.now() - start}ms for ${allUsers.length} users`)
            logger.success(`Export path: ${filePath}`)

            response.download(filePath);
        } catch(err) {
            logger.error(`Error occurred while exporting data: ${err}`);
            response.status(500).json({
                result: false,
                message: `Error occurred while exporting data: ${err}`
            })
        }

    });

    app.post('/admin/getUnreadLogsCount', async (req, res) => {
        try {
            res.json({result: true, count: (await LogModel.query().select('*').where({adminHasRead: false})).length})
        } catch {
            res.status(500).json({result: false})
        }
    })

    app.post('/admin/getLogs', async (req, res) => {
        if (req.body.pageSize == 0) req.body.pageSize = 999;
        try {
            interface UserLogModel extends LogModel {
                user: UserModel
            }

            let unreadLogs = await LogModel.query()
                .select('*')
                .orderBy('createdAt', 'desc')
                .where(
                    (() => {
                        if (req.body.showOnlyUnread) {
                            return {adminHasRead: false}
                        } else return {}
                    })()
                )
                .page(parseInt(req.body.page), parseInt(req.body.pageSize));

            unreadLogs.results = await Promise.all((unreadLogs.results as UserLogModel[]).map(async unreadLog => {
                unreadLog.user = await UserModel.query().findById(unreadLog.userId);
                return unreadLog;
            }));

            res.json({
                result: true,
                data: unreadLogs
            });
            logger.log(`Returning ${unreadLogs.results.length} logs`);

        } catch(err) {
            logger.error(`Error occurred while trying to return unread logs: ${err.stack}`);
            res.status(500).json({
                result: false,
                message: `An error happened while trying to return unread logs!`
            })
        }
    })

    app.post('/admin/markLogs', async (req, res) => {
        try {
            await LogModel.transaction(async (trx) => {
                // Admin interface should just return array of IDs of what to acknowledge
                const numRead = await LogModel.query(trx).findByIds(req.body.data).patch({ adminHasRead: req.body.read});
                res.json({
                    result: true,
                    message: `Marked ${req.body.read} ${numRead} logs.`
                });
                logger.log(`Marked ${req.body.read} ${numRead} logs.`)
            })


        } catch(err) {
            logger.error(`Error occurred while trying to mark logs: ${err.stack}`)
            res.status(500).json({result: false, message: `An error occurred while trying to mark logs!`});
        }
    })

    app.post('/admin/selectAmountOfPeople', async (req, res) => {
        try {
            if (req.body.limit) {
                const selection = await UserModel.query().select('*').limit(req.body.limit);
                res.json({result: true, data: selection});
            } else {
                res.json({result: false, message: "Missing amount parameter"});
            }
        } catch(err) {
            logger.error(`Error occurred while trying to get amount of users: ${err.stack}`)
            res.status(500).json({result: false, message: `An error occurred while trying to get the amount of users!`});
        }
    })

    app.get('/admin/insight', async (req, res) => {
        const totalUserCount = parseInt((await UserModel.query()
            .select()
            .count('*') as any[])[0].count)

        const logsAfterVaccination = await LogModel.query()
            .select()
            .count('*')
            .from('logs')
            .where('logs.createdAt', '>', UserModel.query().select('lastVaccinationTime').where(raw('id = "userId"')))
            .joinRelated('users')
            .select('firstName', 'middleName', 'lastName', 'users.id')
            .groupBy('firstName', 'middleName', 'lastName', 'users.id')
            .where(raw('users.id = "userId"'))
        
        const professions: Record<string,any> = {};
        (await UserModel.query()
            .select('profession')
            .count('profession')
            .groupBy('profession')
            .orderBy('profession', 'desc')
        ).forEach((val: any) => professions[val.profession] = val.count)
            

        const sexes: Record<string,any> = {}; 
        (await UserModel.query()
            .select('sex')
            .count('sex')
            .groupBy('sex')
        ).forEach((val: any) => sexes[val.sex] = val.count)

        const pregnancies: Record<string,any> = {}; 
        (await UserModel.query()
            .select('pregnancyStatus')
            .count('pregnancyStatus')
            .groupBy('pregnancyStatus')
        ).forEach((val: any) => pregnancies[val.pregnancyStatus] = val.count)

        const usersWithNotifsEnabled = parseInt((await PushSubscriptionModel.query()
            .countDistinct("userId") as any[])[0].count)
        
        const vaccinationStatuses: Record<string,any> = {};
        (await UserModel.query()
            .select('isVaccinated')
            .count('isVaccinated')
            .groupBy('isVaccinated')
        ).forEach((val: any) => vaccinationStatuses[val.isVaccinated] = val.count)
        
        const vaccineStatuses: Record<string,any> = {};
        (await UserModel.query()
            .select('isVaccineReady')
            .count('isVaccineReady')
            .groupBy('isVaccineReady')
        ).forEach((val: any) => vaccineStatuses[val.isVaccineReady] = val.count)

        const vaccineManufacturers: Record<string,any> = {};
        (await UserModel.query()
            .select('vaccineManufacturer')
            .count('vaccineManufacturer')
            .groupBy('vaccineManufacturer')
        ).forEach((val: any) => vaccineManufacturers[val.vaccineManufacturer] = val.count)

        const alerts: {title: string; message?: string; type: string;}[] = []

        alerts.push({title: `${totalUserCount} users registered`, type: 'info'})

        if (totalUserCount < 30) {
            alerts.push({
                title: 'Insight data may not be accurate', 
                type: 'warn',
                message: 
                `Only ${totalUserCount} samples are available.<br/>The more users register, the more representative this data is of the population.`
            })
        }
        
        const percentageNotifsEnabled = (usersWithNotifsEnabled / totalUserCount) * 100
        if (percentageNotifsEnabled < 65) {
            alerts.push({
                title: `Only ${percentageNotifsEnabled.toFixed(2)}% have notifications enabled`,
                type: 'warn',
                message: `Information dissemination may suffer.`
            })
        }

        res.json({
            alerts,
            miscItems: {
                totalUserCount,
                logsAfterVaccination,
                usersWithNotifsEnabled, 
            },
            chartItems: {
                professions, 
                sexes, 
                pregnancies, 
                vaccinationStatuses, 
                vaccineStatuses,
                vaccineManufacturers
            }
        })
    })
})();
