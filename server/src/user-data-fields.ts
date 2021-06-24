import Logger from "./logger"
import cluster from "cluster"
import { knex } from "./database"

const logger = Logger("UserDataFields")
interface UserDataField {
  section: string
  name: string
  displayName: string
  type: string
  options?: string[]
  description?: string
  isShownInAdmin?: boolean
}

const dataFields: UserDataField[] = []
// const dataFields: Record<string, UserDataField[]> = {}

const supportedDataFieldTypes = ["string", "integer", "float", "boolean", "date", "enum"]

export const getDataFields = () => dataFields

export const addDataFields = async (data: UserDataField[]) => {
  if (!Array.isArray(data)) data = [data]

  const fields: Record<string, string> = {}
  await Promise.all(
    data.map(async (item) => {
      
      // Supported field checking
      if (!supportedDataFieldTypes.includes(item.type) && item.isShownInAdmin) {
        logger.warn(`User data field ${item.displayName} has an unsupported type ${item.type}. It will still appear in the administrator interface, but your mileage may vary.`)
      }

      if (!(await knex.schema.hasColumn("users", item.name))) {
        // @ts-ignore
        if (cluster.isWorker && cluster.worker.id === 1) fields[item.type] = item.name
        // Only actually create these fields if you're the first worker
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
