import { knex } from '../'
import { Model } from "objection";

Model.knex(knex);

interface User {
  [x: string]: any;
}

export default interface UserModel extends User {}
export default class UserModel extends Model {
  static get tableName() {
    return 'users';
  }
}