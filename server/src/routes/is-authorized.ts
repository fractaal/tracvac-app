import { app } from '../';

app.get('/is-authorized', (request, response) => {
  if (request.isAuthenticated) {
    response.json({
      result: true
    })
  } else {
    response.json({
      result: false,
    })
  }
})
