import { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import CourseService from '#services/courses_service'
import { createCourseValidator, updateCourseValidator } from '#validators/course_validator'

@inject()
export default class CoursesController {
  constructor(private courseService: CourseService) {}

  async index({ auth, response }: HttpContext): Promise<void> {
    const user = auth.user!
    const courses = await this.courseService.getAll(user)
    return response.ok(courses)
  }

  async create({ request, response }: HttpContext): Promise<void> {
    const data = await request.validateUsing(createCourseValidator)
    const course = await this.courseService.create(data)
    return response.created(course)
  }

  async show({ params, response }: HttpContext): Promise<void> {
    const course = await this.courseService.findById(params.id)
    return response.ok(course)
  }

  async update({ params, request, response }: HttpContext): Promise<void> {
    const data = await request.validateUsing(updateCourseValidator)
    const course = await this.courseService.update(params.id, data)
    return response.ok(course)
  }

  async delete({ params, response }: HttpContext): Promise<void> {
    await this.courseService.delete(params.id)
    return response.noContent()
  }
}
