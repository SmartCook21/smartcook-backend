import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Course from '#models/course'
import Tag from '#models/tag'

export default class Article extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare courseId: string

  @column()
  declare name: string

  @column()
  declare quantity: number

  @column()
  declare tagsId: number[]

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Course)
  declare course: BelongsTo<typeof Course>

  @manyToMany(() => Tag, {
    pivotTable: 'articles_tags',
  })
  declare tags: ManyToMany<typeof Tag>
}
