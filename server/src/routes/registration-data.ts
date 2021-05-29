import { app } from '../'

app.get('/registrationData', (req, res) => {
  if (!process.env.IS_CORPORATION) {
    res.json([]);
  } else {
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
  }
})