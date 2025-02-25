import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { ApiService } from '#enums/api_service'
import User from '#models/user'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class ApiRequest extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: string

  @column()
  declare service: ApiService

  @column.dateTime({ autoCreate: true })
  declare initiateAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
