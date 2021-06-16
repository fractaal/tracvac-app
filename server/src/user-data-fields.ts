import Logger from "./logger"
import { knex } from "./database"

const logger = Logger("UserDataFields");
interface UserDataField {
	name: string
	displayName: string
	type: string
	description?: string
	isShownInAdmin?: boolean
}

const dataFields: UserDataField[] = []

export const addDataField = async (data: UserDataField[]) => {
	if (!Array.isArray(data)) data = [data]

	await knex.schema.table("users", async (table) => {
		await Promise.all(data.map(async (item) => {
			if (!await knex.schema.hasColumn("users", item.name)) {
				logger.log(`Creating new column in user table ${item.name}`)
				// @ts-ignore
				table[item.type](item.name)
			} else {
				logger.log(`Not creating column ${item.name} in user table - already exists.`)
			}
		}))
	})

	dataFields.push(...data)
}