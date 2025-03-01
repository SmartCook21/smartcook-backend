import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import string from '@adonisjs/core/helpers/string'
import User from '#models/user'

type TokenType = 'PASSWORD_RESET' | 'VERIFY_EMAIL'

export default class Token extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: string | null

  @column()
  declare type: string

  @column()
  declare token: string

  @column.dateTime()
  declare expiresAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  static async generateVerifyEmailToken(user: User) {
    const token = string.generateRandom(64)

    await Token.expireTokens(user, 'verifyEmailTokens')
    const record = await user.related('tokens').create({
      type: 'VERIFY_EMAIL',
      expiresAt: DateTime.now().plus({ hours: 24 }),
      token,
    })

    return record.token
  }

  static async generatePasswordResetToken(user: User | null) {
    const token = string.generateRandom(64)

    if (!user) {
      return token
    }

    await Token.expireTokens(user, 'passwordResetTokens')
    const record = await user.related('tokens').create({
      type: 'PASSWORD_RESET',
      expiresAt: DateTime.now().plus({ hour: 1 }),
      token,
    })

    return record.token
  }

  static async expireTokens(user: User, relationName: 'passwordResetTokens' | 'verifyEmailTokens') {
    await user?.related(relationName).query().update({
      expiresAt: DateTime.now().toSQLDate(),
    })
  }

  static async getTokenUser(token: string, type: TokenType) {
    const record = await Token.query()
      .preload('user')
      .where('token', token)
      .where('type', type)
      .where('expires_at', '>', DateTime.now().toString())
      .orderBy('createdAt', 'desc')
      .first()

    return record?.user
  }

  static async verify(token: string, type: TokenType) {
    const record = await Token.query()
      .where('expires_at', '>', DateTime.now().toString())
      .where('token', token)
      .where('type', type)
      .first()

    return !!record
  }
}
