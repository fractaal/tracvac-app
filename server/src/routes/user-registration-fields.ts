import { app } from "../"
import { getRegistrationFields } from "../user-registration-fields"

app.get("/registrationData", async (req, res) => {
	res.json(getRegistrationFields())
})