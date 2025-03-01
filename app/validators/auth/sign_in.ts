import vine from '@vinejs/vine'

export const signInValidator = vine.compile(
  vine.object({
    email: vine.string().trim(),
    password: vine.string().trim(),
    remember: vine.boolean().optional(),
    turnstileToken: vine.string().optional(),
  })
)
