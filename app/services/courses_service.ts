import Course from '#models/course_list'

export default class CourseService {
  async create(data: Partial<Course>): Promise<Course> {
    return await Course.create(data)
  }

  async findById(id: string): Promise<Course | null> {
    return await Course.find(id)
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
