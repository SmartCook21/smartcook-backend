import Course from '#models/course'
import User from '#models/user'
import { LucidModel, ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'

export default class CourseService {
  async create(data: Partial<Course>): Promise<Course> {
    return await Course.create(data)
  }

  async findById(id: string): Promise<ModelQueryBuilderContract<Course, InstanceType<LucidModel>>> {
    return Course.query()
      .preload('articles', (query) => {
        query
          .select('articles.id', 'articles.name')
          .pivotColumns(['quantity'])
          .preload('tags', (subQuery) => {
            subQuery.select('id', 'name', 'color')
          })
      })
      .where('id', id)
      .first()
  }

  async getAll(user: User): Promise<Course[]> {
    return Course.query()
      .where('userId', user.id)
      .preload('articles', (query) => {
        query
          .select('articles.id', 'articles.name')
          .pivotColumns(['quantity']) // Récupérer la quantité depuis la table pivot
          .preload('tags', (subQuery) => {
            subQuery.select('id', 'name', 'color')
          })
      })
  }

  async update(id: string, data: Partial<Course>): Promise<Course> {
    const course = await Course.findOrFail(id)
    course.merge(data)
    await course.save()

    if (data.articles) {
      await course.related('articles').detach()

      const articlesData: Record<number, { quantity: number }> = {}
      data.articles.forEach((article) => {
        articlesData[article.id] = { quantity: article.quantity }
      })

      await course.related('articles').attach(articlesData)
    }

    return course
  }

  async delete(id: string): Promise<void> {
    const course = await Course.findOrFail(id)
    await course.delete()
  }
}
