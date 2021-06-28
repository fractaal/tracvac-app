import Logger from "./logger"
import { app } from "./"

const logger = Logger("UserRegistrationFields")
const registrationFields: any[] = []

export function addRegistrationFields(data: any[]) {
	logger.log("New registration fields added", data.map(x => x.name))
	registrationFields.push(...data)
}

export const getRegistrationFields = () => registrationFields

app.get("/registrationData", (req, res) => {
	res.json(registrationFields)
})