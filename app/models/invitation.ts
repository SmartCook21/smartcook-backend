import { DateTime } from 'luxon'
import { afterCreate, BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { InvitationState } from '#enums/invitation_state'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Course from '#models/course'
import { randomUUID } from 'node:crypto'

export default class Invitation extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare courseId: string

  @column()
  declare token: string

  @column()
  declare state: InvitationState

  @column()
  declare invitedEmail: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Course)
  declare course: BelongsTo<typeof Course>

  @afterCreate()
  static createSlug(invitation: Invitation) {
    invitation.token = randomUUID().replace(/-/g, '')
  }
}
