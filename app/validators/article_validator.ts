import vine from '@vinejs/vine'

export const createArticleValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(255),
    tags: vine.array(vine.number()).optional(),
  })
)

export const updateArticleValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(255).optional(),
    tags: vine.array(vine.number()).optional(),
  })
)

export const addArticleToCourseValidator = vine.compile(
  vine.object({
    articles: vine.array(
      vine.object({
        id: vine.number().positive(),
        quantity: vine.number().min(1),
      })
    ),
  })
)
