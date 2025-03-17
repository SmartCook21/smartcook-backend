import Course from '#models/course'
import User from '#models/user'

export default class CourseService {
  async create(data: Partial<Course>): Promise<Course> {
    return await Course.create(data)
  }

  async findById(id: string) {
    const courses = await Course.query()
      .preload('articles', (query) => {
        query
          .select('articles.id', 'articles.name')
          .pivotColumns(['quantity']) // Assure que la colonne `quantity` de la table pivot est bien récupérée
          .preload('tags', (subQuery) => {
            subQuery.select('id', 'name', 'color')
          })
      })
      .where('id', id)

    // Convertir les résultats en JSON et mapper pour inclure `quantity`
    return courses.map((course) => ({
      ...course.toJSON(),
      articles: course.articles.map((article) => ({
        ...article.toJSON(),
        quantity: article.$extras.quantity, // Récupérer `quantity` depuis la table pivot
      })),
    }))
  }

  async getAll(user: User): Promise<Course[] | null> {
    return await Course.findManyBy('userId', user.id)
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
