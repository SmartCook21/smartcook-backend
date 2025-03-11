import { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import CourseService from '#services/courses_service'

@inject()
export default class CoursesController {
  constructor(private courseService: CourseService) {}

  async create({ request, response }: HttpContext): Promise<void> {
    const data = request.only(['creator', 'name'])
    const course = await this.courseService.create(data)
    return response.created(course)
  }

  async show({ params, response }: HttpContext): Promise<void> {
    const course = await this.courseService.findById(params.id)
    return response.ok(course)
  }

  async update({ params, request, response }: HttpContext): Promise<void> {
    const data = request.only(['name'])
    const course = await this.courseService.update(params.id, data)
    return response.ok(course)
  }

  async delete({ params, response }: HttpContext): Promise<void> {
    await this.courseService.delete(params.id)
    return response.noContent()
  }
}
