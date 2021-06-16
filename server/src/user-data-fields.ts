import Logger from "./logger"
import { knex } from "./database"

const logger = Logger("UserDataFields");

export const addDataField = () => {
	knex.schema.table("users", table => {
		console.log(table)
	})
}