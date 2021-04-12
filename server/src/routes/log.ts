import { app } from '../';
import Logger from '../logger';
import { LogModel } from '../database/models/LogModel';

const logger = Logger('Log Route')

app.use('/log', async (request, response, next) => {
  if (request.isAuthenticated) {
    if (request.tokenData.userId) {
      next();
    } else {
      response.status(400).json({ result: false, message: 'Please reauthenticate' })
    }
  } else {
    response.status(400).json({ result: false, message: 'You are not authenticated' })
  }
})

app.get('/log/:index', async (request, response, next) => {
  try {
    const logs = await LogModel.query()
      .select('*')
      .where('userId', '=', request.tokenData.userId)
      .orderBy('createdAt', 'desc')
      .page(parseInt(request.params.index), 7);

    (logs.results as Partial<LogModel>[]).forEach(log => delete log.adminHasRead)

    response.status(200).json({ result: true, logs })
  } catch (err) { next(err); }
})

app.post('/log', async (request, response, next) => {
  try {

    // Disallow post if no symptoms
    try {
      if (!Object.values(request.body).reduce((acc, curr) => curr || acc)) {
        response.status(400).json({result: false, message: 'You have no symptoms...'});
        return;
      }
    } catch(err) {
      response.status(400).json({result: false, message: 'You have no symptoms...'});
      return;
    }

    try {
      await LogModel.query().insert({ ...request.body, userId: request.tokenData.userId })
    } catch (err) {
      response.status(400).json({ result: false, message: 'You sent invalid data.' })
      return;
    }

    logger.log(`Log by user ${request.tokenData.userId} posted!`)
    response.json({ result: true, message: 'Log posted!' })
  } catch (err) { next(err); }
})
