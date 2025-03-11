import vine from '@vinejs/vine'

export const createTagValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(255),
    color: vine.string().trim().minLength(3).maxLength(7),
  })
)

export const updateTagValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(255).optional(),
    color: vine.string().trim().minLength(3).maxLength(7).optional(),
  })
)

export const findTagValidator = vine.compile(
  vine.object({
    id: vine.number().positive(),
  })
)

export const deleteTagValidator = vine.compile(
  vine.object({
    id: vine.number().positive(),
  })
)
