import vine from '@vinejs/vine'

export const createCourseValidator = vine.compile(
  vine.object({
    user_id: vine.string().uuid(),
    name: vine.string().trim().minLength(2).maxLength(255),
  })
)

export const updateCourseValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(255).optional(),
    articles: vine
      .array(
        vine.object({
          id: vine.number().positive(),
          quantity: vine.number().positive(),
        })
      )
      .optional(),
  })
)
