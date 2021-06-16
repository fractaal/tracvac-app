import Logger from "./logger"

const logger = Logger("UserDataFields");
interface UserDataField {
	name: string
	displayName: string
	type: string
	description?: string
	isShownInAdmin?: boolean
}

const dataFields: UserDataField[] = []

export const addDataField = async (data: UserDataField | UserDataField[]) => {
	if (!Array.isArray(data)) data = [data]
	dataFields.push(...data)
}