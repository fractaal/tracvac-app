import Logger from '../logger';
import { dbStatusCheck } from './migration';
import Knex from 'knex';

const logger = Logger('Database');

// Init knex
logger.log('Initializing SQL query builder...')
/**
export const knex = Knex({
  client: 'pg',
  useNullAsDefault: true,
  connection: {
    host     : '127.0.0.1',
    user     : 'postgres',
    port     : 35432,
    password : 'postgres',
    database : 'tracvac-db',
  },
});*/

export const knex = Knex({
  client: 'sqlite3',
  connection: {
    filename: './tracvac-db.sqlite3'
  }
})

export async function connect() {
  logger.log('Connecting to database..');
  await dbStatusCheck();
}
