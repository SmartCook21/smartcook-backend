import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeCreate,
  belongsTo,
  column,
  hasMany,
  manyToMany,
} from '@adonisjs/lucid/orm'
import User from '#models/user'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'node:crypto'
import Article from '#models/article'
import Invitation from '#models/invitation'

export default class Course extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare userId: string

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @manyToMany(() => Article, {
    pivotTable: 'article_course',
  })
  declare articles: ManyToMany<typeof Article>

  @hasMany(() => Invitation)
  declare invitations: HasMany<typeof Invitation>

  @beforeCreate()
  static createUUID(course: Course) {
    course.id = randomUUID()
  }
}
