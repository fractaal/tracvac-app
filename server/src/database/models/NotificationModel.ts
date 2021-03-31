import { BaseModel } from './BaseModel'

export class NotificationModel extends BaseModel {
  title!: string
  subtitle!: string
  content!: string

  static tableName = 'notifications'

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['title', 'content'],
      properties: {
        title: {
          type: 'string'
        },
        subtitle: {
          type: 'string'
        },
        content: {
          type: 'string'
        }
      }
    }
  }
}
