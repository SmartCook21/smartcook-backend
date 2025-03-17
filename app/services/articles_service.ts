import Article from '#models/article'
import Course from '#models/course'
import User from '#models/user'

export default class ArticlesService {
  async create(user: User, data: Partial<Article>): Promise<Article> {
    // Extraire les tags s'ils sont fournis
    const tags = data.tags as number[] | undefined

    // Créer l'article
    console.log(data)
    const article = await Article.create({
      userId: user.id,
      name: data.name,
    })

    // Associer les tags à l'article si fournis
    if (tags) {
      await article.related('tags').attach(tags)
    }

    // Charger les tags pour la réponse
    await article.load('tags')

    return article
  }

  async findById(id: number): Promise<Article | null> {
    return await Article.find(id)
  }

  async getAll(user: User): Promise<Article[] | null> {
    return Article.query().preload('tags').where('userId', user.id)
  }

  async update(id: number, data: Partial<Article>): Promise<Article> {
    const article = await Article.findOrFail(id)

    // Extraire les tags de data (si présents)
    const tags = data.tags as number[] | undefined
    delete data.tags

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

  async addArticleToCourse(courseId: string, articleId: number, quantity: number): Promise<void> {
    // Vérifier si l'article et le cours existent
    const article = await Article.findOrFail(articleId)
    const course = await Course.findOrFail(courseId)

    // Associer l'article au cours avec la quantité via la table pivot
    await course.related('articles').attach({
      [article.id]: { quantity },
    })
  }
}
