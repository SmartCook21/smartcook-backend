import vine from '@vinejs/vine'
import { unique } from '#helpers/db'

export const signUpValidator = vine.compile(
  vine.object({
    email: vine
      .string()
      .trim()
      .email()
      .unique(unique('users', 'email', { caseInsensitive: true })),
    password: vine.string().trim().minLength(8),
    turnstileToken: vine.string().optional(),
  })
)
