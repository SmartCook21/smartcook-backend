import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, beforeCreate, column, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import ApiRequest from '#models/api_request'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Transaction from '#models/transaction'
import Recipe from '#models/recipe'
import { randomUUID } from 'node:crypto'
import Course from '#models/course'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare country: string | null

  @column()
  declare emailVerified: boolean

  @column()
  declare googleId: string | null

  @column()
  declare googleEmail: string | null

  @column()
  declare googleAccessToken: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(() => ApiRequest)
  declare apiRequests: HasMany<typeof ApiRequest>

  @hasMany(() => Transaction)
  declare transactions: HasMany<typeof Transaction>

  @hasMany(() => Recipe)
  declare recipes: HasMany<typeof Recipe>

  @hasMany(() => Course)
  declare courses: HasMany<typeof Course>

  @beforeCreate()
  static createUUID(user: User) {
    user.id = randomUUID()
  }
}
