import { Model } from 'objection'
import { knex } from '../'

Model.knex(knex);

export class BaseModel extends Model {}
