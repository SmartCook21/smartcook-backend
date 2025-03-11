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

  async create({ request, response }: HttpContext): Promise<void> {
    const data = await request.validateUsing(createArticleValidator)
    const article = await this.articleService.create(data)
    return response.created(article)
  }

  async show({ params, response }: HttpContext): Promise<void> {
    const article = await this.articleService.findById(params.id)
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
    const article = await this.articleService.addArticleToCourse(params.courseId, data)
    return response.created(article)
  }

  async attachTag({ request, response }: HttpContext): Promise<void> {
    const data = await request.validateUsing(attachTagValidator)
    const article = await this.articleService.attachTag(data.articleId, data.tagsId)
    return response.ok(article)
  }
}
