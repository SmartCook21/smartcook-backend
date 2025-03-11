import Tag from '#models/tag'

export default class TagService {
  async create(data: Partial<Tag>): Promise<Tag> {
    return await Tag.create(data)
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
