import Logger from './logger'
import { mkdtemp } from 'fs/promises'
import path from 'path'
import os from 'os'
import ExcelJS from 'exceljs'
import { knex } from './database'

const logger = Logger('Exporter')

export async function exportTable(model: any, tableName: string, columnsToExclude: string[]): Promise<[boolean, string]> {
  const start = Date.now();
  logger.log(`Performing table export on ${tableName}!`)

  let workbook: ExcelJS.Workbook;
  let sheet: ExcelJS.Worksheet;

  try {

      workbook = new ExcelJS.Workbook();

      workbook.creator = "Tracvac";
      workbook.created = new Date();
      workbook.modified = new Date();

      sheet = workbook.addWorksheet("people");

      const _columns: string[] = (await knex.raw(`SELECT * FROM information_schema.columns WHERE table_name = '${tableName}'`)).rows.map((val: any) => val.column_name);
      const columns = [];

      for (const column of _columns) {
          if (columnsToExclude.indexOf(column) === -1) {
            columns.push({
                header: column,
                key: column
          })
        }
      }

      sheet.columns = columns; // Fix column.equivalentTo is undefined

  } catch(err) {
      logger.error(`Error occurred while initializing the workbook: ${err}`)
      return [false, `Error occured while initializing the workbook: ${err}`]
  }

  let table: typeof model[];

  try {
      table = await model.query().select('*');
  } catch (err) {
      logger.error(`Error occurred while querying the database: ${err}`);
      return [false, `Error occured while querying the database: ${err}`]
  }

  try {
      for (const user of table) {
          sheet.addRow(user);
      }

      const folder = await mkdtemp(path.join(os.tmpdir(), 'tracvac-export-'))
      const filePath = path.join(folder, `export-${Date.now()}.xlsx`)
      await workbook.xlsx.writeFile(filePath);

      logger.success(`Data export complete.`)
      logger.success(`Took ${Date.now() - start}ms for ${table.length} users`)
      logger.success(`Export path: ${filePath}`)

      return [true, filePath]
  } catch(err) {
      logger.error(`Error occurred while exporting data: ${err}`)
      return [false, `Error occurred while exporting data: ${err}`]
  }

}