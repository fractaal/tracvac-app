import { app } from "./"

const registrationFields: any[] = []

export function addRegistrationFields(data: any[]) {
	registrationFields.push(...data)
}

export const getRegistrationFields = () => registrationFields

app.get("/registrationData", (req, res) => {
	res.json(registrationFields)
})