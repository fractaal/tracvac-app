import { app } from '../'
import { getConfig } from '../config';

app.get('/registrationData', async (req, res) => {
  if ((await getConfig()).isCorporation) {
    res.json([
      {
        title: "Company Information",
        description: "Information relating to your workplace.",
        formItems: [
          {
            name: "companyBranch",
            displayName: "Company Branch",
            type: "string",
            format: "Text"
          }
        ]
      }
    ])
  } else {
    res.json([])
  }
})