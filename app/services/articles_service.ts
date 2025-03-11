import Article from '#models/article'
import CourseList from '#models/course_list'

export default class ArticlesService {
  async create(data: Partial<Article>): Promise<Article> {
    return await Article.create(data)
  }

  async findById(id: number): Promise<Article | null> {
    return await Article.find(id)
  }

  async update(id: number, data: Partial<Article>): Promise<Article> {
    const article = await Article.findOrFail(id)
    article.merge(data)
    await article.save()
    return article
  }

  async delete(id: number): Promise<void> {
    const article = await Article.findOrFail(id)
    await article.delete()
  }

  async addArticleToCourse(courseId: string, data: Partial<Article>): Promise<Article> {
    const course = await CourseList.findOrFail(courseId)
    return await Article.create({ ...data, courseId: course.id })
  }

  async attachTag(articleId: number, tagId: number): Promise<Article> {
    const article = await Article.findOrFail(articleId)
    article.tagsId = [...(article.tagsId || []), tagId]
    await article.save()
    return article
  }
}
