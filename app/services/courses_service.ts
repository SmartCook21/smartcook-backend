import Course from '#models/course'
import User from '#models/user'
import { LucidModel, ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import Course from '#models/course'

export default class CourseService {
  async create(data: Partial<Course>): Promise<Course> {
    return await Course.create(data)
  }

  async findById(id: string): Promise<ModelQueryBuilderContract<Course, InstanceType<LucidModel>>> {
    return Course.query()
      .preload('articles', (query) => {
        query.select('id', 'name', 'quantity').preload('tags', (subQuery) => {
          subQuery.select('id', 'name', 'color')
        })
      })
      .where('id', id)
  }

  async getAll(user: User): Promise<Course[] | null> {
    return await Course.findManyBy('userId', user.id)
  }

  async update(id: string, data: Partial<Course>): Promise<Course> {
    const course = await Course.findOrFail(id)
    course.merge(data)
    await course.save()
    return course
  }

  async delete(id: string): Promise<void> {
    const course = await Course.findOrFail(id)
    await course.delete()
  }
}
