import vine from '@vinejs/vine'

export const createInvitationValidator = vine.compile(
  vine.object({
    course_id: vine.string().uuid(),
    invited_email: vine.string().trim().email(),
  })
)
