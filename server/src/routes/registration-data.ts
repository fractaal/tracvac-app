import { app } from '../'

app.get('/registrationData', (req, res) => {
  if (!!process.env.IS_CORPORATION) {
    return [];
  } else {
    return [
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
    ]
  }
})