import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import TagService from '#services/tags_service'

@inject()
export default class TagsListsController {
  constructor(private tagService: TagService) {}

  async create({ request, response }: HttpContext): Promise<void> {
    const data = request.only(['user_id', 'name', 'color'])
    const tag = await this.tagService.create(data)
    return response.created(tag)
  }

  async show({ params, response }: HttpContext): Promise<void> {
    const tag = await this.tagService.findById(params.id)
    return response.ok(tag)
  }

  async update({ params, request, response }: HttpContext): Promise<void> {
    const data = request.only(['name', 'color'])
    const tag = await this.tagService.update(params.id, data)
    return response.ok(tag)
  }

  async delete({ params, response }: HttpContext): Promise<void> {
    await this.tagService.delete(params.id)
    return response.noContent()
  }
}
