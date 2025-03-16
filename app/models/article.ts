import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import CourseList from '#models/course_list'
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

  @belongsTo(() => CourseList, { foreignKey: 'course_id', localKey: 'course_id' })
  declare course: BelongsTo<typeof CourseList>

  @hasMany(() => Tag)
  declare tags: HasMany<typeof Tag>
}
