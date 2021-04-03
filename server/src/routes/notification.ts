import { app } from "../index";
import { NotificationModel } from "../database/models/NotificationModel";
import Logger from '../logger';

const logger = Logger("Notification Route");

// Notifications route.
app.use('/notification', (request, response, next) => {
    if (request.isAuthenticated) {
        next();
    } else {
        response.status(400).json({result: false, message: `You are not authorized`});
    }
})

app.get('/notification/:index', async (request, response, next) => {
    try {
        const notifs = await NotificationModel
            .query()
            .select('*')
            .orderBy('createdAt', 'desc')
            .page(parseInt(request.params.index) ?? 0, 7);

        response.json({
            result: true,
            notifications: notifs,
        })
    } catch (e) {
        logger.error(`Error while retrieving notifications: ${e}`);
        response.status(500).json({result: false, message: 'Something happened while processing your request'})
    }
})
