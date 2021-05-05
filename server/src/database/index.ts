import Logger from '../logger';
import { dbStatusCheck } from './migration';
import Knex from 'knex';
import { getDbConfig } from "../db-config";

const logger = Logger('Database');

// Init knex
logger.log('Initializing SQL query builder...')

const dbConfig = getDbConfig();

const connection = typeof dbConfig === 'string' ? dbConfig : {
  host     : dbConfig.host,
  user     : dbConfig.user,
  port     : dbConfig.port,
  password : dbConfig.password,
  database : dbConfig.database,
  ssl      : dbConfig.useSSL ? { rejectUnauthorized: false } : false,
}

export const knex = Knex({
  client: 'pg',
  useNullAsDefault: true,
  connection,
  pool: {
    max: 5,
  }
});

/**
export const knex = Knex({
  client: 'sqlite3',
  connection: {
    filename: './tracvac-db.sqlite3'
  },
  useNullAsDefault: true,
})
*/

export async function connect() {
  logger.log('Connecting to database...');
  await dbStatusCheck();
}
