import { app } from "../index"
import path from 'path'
import Logger from '../logger'
import { Request, Response, NextFunction } from "express"
import { raw } from 'objection'
import { NotificationModel } from "../database/models/NotificationModel"
import { UserModel } from "../database/models/UserModel"
import { LogModel } from "../database/models/LogModel"
import { getConfig, isProperlyConfigured, setConfig } from "../config"
import Config from "../interfaces/config"
import { internalStaticPath } from '../'
import open from 'open'
import os from 'os'
import ExcelJS from 'exceljs'
import registrationFormTemplate from "../database/templates/registrationFormTemplate";

const logger = Logger("Administrator Route");

const adminCheckerMiddleware = (request: Request, response: Response, next: NextFunction) => {
    if (request.socket.localAddress === request.socket.remoteAddress) {
        // logger.log('Admin routes have been accessed.');
        next();
    } else {
        logger.warn(`An attempt to access the administrator interface was made from ${request.socket.remoteAddress}`)
        response.status(401).json({result: false, message: "You are not authorized"});
    }

};

app.use('/admin/*', adminCheckerMiddleware)
app.use('/admin', adminCheckerMiddleware)

app.get('/admin', (request, response) => {
    response.sendFile(path.resolve(internalStaticPath, 'index.html'));
})

app.post('/admin/setup', async (request, response) => {

    if (
        request.body.location &&
        request.body.lguUrl &&
        request.body.secret &&
        request.body.httpPort &&
        request.body.httpsPort
    ) {
        if (request.body.isConfigured) delete request.body.isConfigured;
        try {
            if (await setConfig(request.body as Config)) {
                logger.success(`Configuration was updated: ${request.body}`);
                response.json({result: true});
            } else {
                response.status(500).json({result: false, message: "Something happened while updating the config"});
            }
        } catch(e) {
            logger.error('While updating config: ' + e);
            response.status(500).json({result: false, message: "Something happened while updating the config"});
        }
    } else {
        logger.warn('Admin sent invalid setup');
        response.status(400).json({result: false, message: "You sent an invalid setup configuration."});
    }
})

app.get('/admin/setup', async (request, response) => {
    const config: Partial<Config> = await getConfig();
    const isConfigured = await isProperlyConfigured();

    if (isConfigured) {
        response.json({
            isConfigured: true,
            ...config
        })
    } else {
        response.json({
            isConfigured: false,
            ...config
        })
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
                user.isPUI === undefined
            ) response.status(400).json({result: false, message: "Missing parameters."})
        }

        try {
            await UserModel.transaction(async (trx) => {
                for (const user of request.body.data as Partial<UserModel>[]) {
                    await UserModel.query(trx).where({ id: user.id }).patch({
                        isVaccinated: !!user.isVaccinated,
                        vaccineManufacturer: user.vaccineManufacturer,
                        isVaccineReady: user.isVaccineReady,
                        isPUI: !!user.isPUI,
                        isPUM: !!user.isPUM,
                    });
                }
            })
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

        const pathToWrite = path.resolve(os.homedir(), 'Desktop', 'export.xlsx');

        await workbook.xlsx.writeFile(pathToWrite);
        await open(pathToWrite)

        response.json({result: true, message: `Export complete!`});
        logger.success(`User data export complete.`)
        logger.success(`Took ${Date.now() - start}ms for ${allUsers.length} users`)
        logger.success(`Export path: ${pathToWrite}`)
        logger.success(`Auto-opening for convenience.`)
    } catch(err) {
        logger.error(`Error occurred while exporting data: ${err}`);
        response.status(500).json({
            result: false,
            message: `Error occurred while exporting data: ${err}`
        })
    }

});

app.get('/admin/getUnreadLogs', async (req, res) => {
    try {
        const unreadLogs = await LogModel.query().where({ adminHasRead: false }).select('*');

        res.json({
            result: true,
            data: unreadLogs
        });
    } catch(err) {
        logger.error(`Error occurred while trying to return unread logs: ${err.stack}`);
        res.status(500).json({
            result: false,
            message: `An error happened while trying to return unread logs!`
        })
    }
})

app.post('/admin/acknowledgeUnreadLogs', async (req, res) => {
    try {
        await LogModel.transaction(async (trx) => {
            // Admin interface should just return array of IDs of what to acknowledge
            const numRead = await LogModel.query(trx).findByIds(req.body.data).patch({ adminHasRead: true });
            res.json({
                result: true,
                message: `Marked read ${numRead} logs.`
            });
        })
    } catch(err) {
        logger.error(`Error occurred while trying to acknowledge unread logs: ${err.stack}`)
        res.status(500).json({result: false, message: `An error occurred while trying to acknowledge unread logs!`});
    }
})
