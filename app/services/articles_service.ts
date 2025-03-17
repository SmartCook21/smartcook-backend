import Article from '#models/article'
import Course from '#models/course'
import User from '#models/user'

export default class ArticlesService {
  async create(data: Partial<Article>): Promise<Article> {
    return await Article.create(data)
  }

  async findById(id: number): Promise<Article | null> {
    return await Article.find(id)
  }

  async getAll(user: User): Promise<Article[] | null> {
    return await Article.query().preload('tags').where('')
  }

  async update(id: number, data: Partial<Article>): Promise<Article> {
    const article = await Article.findOrFail(id)

    // Extraire les tags de data (si présents)
    const tags = data.tags as number[] | undefined
    delete data.tags // Supprimer tags de l'objet data pour éviter de l'insérer comme une colonne

    // Mettre à jour les autres champs de l'article
    article.merge(data)
    await article.save()

    // Si des tags sont fournis, mettre à jour la relation Many-to-Many
    if (tags) {
      await article.related('tags').sync(tags) // Sync met à jour en supprimant les anciens et ajoutant les nouveaux
    }

    // Charger les tags pour la réponse
    await article.load('tags')

    return article
  }

  async delete(id: number): Promise<void> {
    const article = await Article.findOrFail(id)
    await article.delete()
  }

  async addArticleToCourse(courseId: string, data: Partial<Article>): Promise<Article> {
    const course = await Course.findOrFail(courseId)
    return await Article.create({ ...data, courseId: course.id })
  }

  async attachTag(articleId: number, tagId: number): Promise<Article> {
    const article = await Article.findOrFail(articleId)
    article.tagsId = [...(article.tagsId || []), tagId]
    await article.save()
    return article
  }
}
