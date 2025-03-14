import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import TagService from '#services/tags_service'
import { createTagValidator, updateTagValidator } from '#validators/tag_validator'

@inject()
export default class TagsListsController {
  constructor(private tagService: TagService) {}

  async index({ auth, response }: HttpContext): Promise<void> {
    const user = auth.user!
    const tag = await this.tagService.getAll(user)
    return response.ok(tag)
  }

  async create({ request, response, auth }: HttpContext): Promise<void> {
    const data = await request.validateUsing(createTagValidator)
    const user = auth.user!
    const tag = await this.tagService.create(user, data)
    return response.created(tag)
  }

  async show({ params, response }: HttpContext): Promise<void> {
    const tag = await this.tagService.findById(params.id)
    return response.ok(tag)
  }

  async update({ params, request, response }: HttpContext): Promise<void> {
    const data = await request.validateUsing(updateTagValidator)
    const tag = await this.tagService.update(params.id, data)
    return response.ok(tag)
  }

  async delete({ params, response }: HttpContext): Promise<void> {
    await this.tagService.delete(params.id)
    return response.noContent()
  }
}
