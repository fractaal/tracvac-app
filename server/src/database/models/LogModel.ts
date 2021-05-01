import { Model } from 'objection'
import path from 'path'

import { BaseModel } from './BaseModel'

export class LogModel extends BaseModel {
  fever!: boolean
  abdominalPain!: boolean
  chills!: boolean
  cough!: boolean
  diarrhea!: boolean
  difficultyBreathing!: boolean
  headache!: boolean
  soreThroat!: boolean
  nauseaOrVomiting!: boolean
  userId!: number
  others!: string
  adminHasRead!: boolean

  static tableName = 'logs'

  static get jsonSchema () {
    return {
      type: 'object',
      properties: {
        fever: {
          type: 'boolean',
          default: false
        },
        abdominalPain: {
          type: 'boolean',
          default: false
        },
        chills: {
          type: 'boolean',
          default: false
        },
        cough: {
          type: 'boolean',
          default: false
        },
        diarrhea: {
          type: 'boolean',
          default: false
        },
        difficultyBreathing: {
          type: 'boolean',
          default: false
        },
        headache: {
          type: 'boolean',
          default: false
        },
        soreThroat: {
          type: 'boolean',
          default: false
        },
        nauseaOrVomiting: {
          type: 'boolean',
          default: false
        },
        others: {
          type: 'string'
        }
      }
    }
  }

  static get relationMappings () {
    return {
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, 'UserModel'),
        join: {
          from: 'logs.userId',
          to: 'users.id'
        }
      }
    }
  }
}
