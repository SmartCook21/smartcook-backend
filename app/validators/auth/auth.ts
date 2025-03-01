import vine from '@vinejs/vine'

export const resendVerifyEmailValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email(),
  })
)
export const changePasswordSchema = vine.compile(
  vine.object({
    oldPassword: vine.string().minLength(8),
    newPassword: vine.string().minLength(8),
    turnstileToken: vine.string().optional(),
  })
)
