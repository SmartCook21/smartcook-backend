import vine from '@vinejs/vine'
export const newPasswordValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email(),
    turnstileToken: vine.string().optional(),
  })
)
