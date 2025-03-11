import Tag from '#models/tag'
import User from '#models/user'

export default class TagService {
  async create(user: User, data: Partial<Tag>): Promise<Tag> {
    return await Tag.create({ ...data, userId: user.id })
  }

  async findById(id: number): Promise<Tag | null> {
    return await Tag.find(id)
  }

  async update(id: number, data: Partial<Tag>): Promise<Tag> {
    const tag = await Tag.findOrFail(id)
    tag.merge(data)
    await tag.save()
    return tag
  }

  async delete(id: number): Promise<void> {
    const tag = await Tag.findOrFail(id)
    await tag.delete()
  }
}
