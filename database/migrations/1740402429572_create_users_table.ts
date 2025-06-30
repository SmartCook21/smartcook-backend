import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
      table.string('country').nullable()
      table.boolean('email_verified').nullable()
      table.string('avatar').nullable()
      table.string('google_id').nullable()
      table.string('google_email').nullable()
      table.string('google_access_token').nullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
