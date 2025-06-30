import { BaseSchema } from '@adonisjs/lucid/schema'
import { InvitationState } from '#enums/invitation_state'

export default class extends BaseSchema {
  protected tableName = 'invitations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      /*table.uuid('course_id').references('id').inTable('course_lists').onDelete('CASCADE')
      table.string('token', 36).notNullable()
      table
        .enum('state', Object.values(InvitationState))
        .notNullable()
        .defaultTo(InvitationState.WAITING)
      table.string('invited_email').notNullable()*/
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
