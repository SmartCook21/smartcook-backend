import { BaseSchema } from '@adonisjs/lucid/schema'
import { ApiService } from '#enums/api_service'

export default class extends BaseSchema {
  protected tableName = 'api_requests'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE')
      table.enum('service', Object.values(ApiService)).notNullable()
      table.timestamp('initiate_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
