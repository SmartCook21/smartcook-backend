import vine from '@vinejs/vine'

export const createArticleValidator = vine.compile(
  vine.object({
    course_id: vine.string().uuid(),
    name: vine.string().trim().minLength(2).maxLength(255),
    quantity: vine.number().min(1),
    tags_id: vine.array(vine.number()).optional(),
  })
)

export const updateArticleValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(255).optional(),
    quantity: vine.number().min(1).optional(),
    tags_id: vine.array(vine.number()).optional(),
  })
)

export const addArticleToCourseValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(255),
    quantity: vine.number().min(1),
    tagsId: vine.array(vine.number()).optional(),
  })
)

export const attachTagValidator = vine.compile(
  vine.object({
    articleId: vine.number().positive(),
    tagsId: vine.number().positive(),
  })
)
