import { Model } from 'objection';
import Knex from 'knex';

// Init knex
const knex = Knex({
  client: 'postgres',
  useNullAsDefault: true,
  connection: process.env.DB_URL
})