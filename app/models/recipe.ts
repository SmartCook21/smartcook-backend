import { DateTime } from 'luxon'
import { afterCreate, BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'
import User from '#models/user'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Recipe extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare creatorId: string

  @column()
  declare name: string

  @column()
  declare text: string

  @column()
  declare slug: string | null

  @column()
  declare isPublic: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @afterCreate()
  static createSlug(recipe: Recipe) {
    recipe.slug = randomUUID().replace(/-/g, '')
  }

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
