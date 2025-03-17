import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import ArticlesService from '#services/articles_service'
import {
  addArticleToCourseValidator,
  attachTagValidator,
  createArticleValidator,
  updateArticleValidator,
} from '#validators/article_validator'

@inject()
export default class ArticlesController {
  constructor(private articleService: ArticlesService) {}

  async create({ request, response, auth }: HttpContext): Promise<void> {
    const data = await request.validateUsing(createArticleValidator)
    const user = auth.user!
    const article = await this.articleService.create(user, data)
    return response.created(article)
  }

  async show({ params, response }: HttpContext): Promise<void> {
    const article = await this.articleService.findById(params.id)
    return response.ok(article)
  }

  async index({ auth, response }: HttpContext): Promise<void> {
    const user = auth.user!
    const article = await this.articleService.getAll(user)
    return response.ok(article)
  }

  async update({ params, request, response }: HttpContext): Promise<void> {
    const data = await request.validateUsing(updateArticleValidator)
    const article = await this.articleService.update(params.id, data)
    return response.ok(article)
  }

  async delete({ params, response }: HttpContext): Promise<void> {
    await this.articleService.delete(params.id)
    return response.noContent()
  }

  async addArticleToCourse({ params, request, response }: HttpContext): Promise<void> {
    const data = await request.validateUsing(addArticleToCourseValidator)
    const article = await this.articleService.addArticlesToCourse(params.courseId, data)
    return response.created(article)
  }
}
