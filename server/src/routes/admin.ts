import { app } from "../index";
import path from 'path';
import Logger from '../logger';
import {Request, Response, NextFunction} from "express";
import { UserModel } from "../database/models/UserModel";
import { raw, transaction } from 'objection';
import {NotificationModel} from "../database/models/NotificationModel";
import {getConfig, setConfig} from "../config";
import Config from "../interfaces/config";
import { internalStaticPath } from '../'

const logger = Logger("admin");

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
    const config = await getConfig();

    if (config) {
        // @ts-ignore
        delete config.password;

        response.json({
            isConfigured: true,
            ...config
        })
    } else {
        response.json({
            isConfigured: false,
        })
    }
})


app.post('/admin/getUsers', async (request, response) => {
    if (request.body.pageSize === 0) request.body.pageSize = 1000;
    if (request.body.pageSize !== undefined && request.body.page !== undefined) {
        let result;
        if (request.body.filter) {
            result = await UserModel.query()
                .select('*')
                .where(
                    raw("firstName || ' ' || middleName || ' ' || lastName"),
                    'LIKE',
                    `%${request.body.filter}%`
                ).where(
                    (() => {
                        const where = {} as Record<string,any>;
                        if (request.body.showPUMs) where.isPUM = true;
                        if (request.body.showPUIs) where.isPUI = true;
                        return where
                    })()
                )
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
                )
                .page(parseInt(request.body.page), parseInt(request.body.pageSize));
        }
        response.json(result);
    } else {
        response.status(400).json({result: false, message: 'Missing page/pageSize params'})
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
            console.log(request.body.data)
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
