import Logger from "./logger"
import { knex } from "./database"

const logger = Logger("UserDataFields")
interface UserDataField {
  section: string
  name: string
  displayName: string
  type: string
  description?: string
  isShownInAdmin?: boolean
}

const dataFields: UserDataField[] = []
// const dataFields: Record<string, UserDataField[]> = {}

export const getDataFields = () => dataFields

export const addDataFields = async (data: UserDataField[]) => {
  if (!Array.isArray(data)) data = [data]

  const fields: Record<string, string> = {}
  await Promise.all(
    data.map(async (item) => {
      if (!(await knex.schema.hasColumn("users", item.name))) {
        // @ts-ignore
        fields[item.type] = item.name
      } else {
        logger.log(
          `Not creating column ${item.name} in user table - already exists.`
        )
      }
    })
  )

  await knex.schema.table("users", async (table) => {
    for (const [type, name] of Object.entries(fields)) {
      logger.log(`Creating new column ${name} of type ${type}`)
      // @ts-ignore
      table[type](name)
    }
  })

  // data.forEach((field) => {
  //   if (!(field.section in dataFields)) {
  //     dataFields[field.section] = [field]
  //   } else {
  //     dataFields[field.section].push(field)
  //   }
  // })

  dataFields.push(...data)
}
