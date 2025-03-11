import Invitation from '#models/invitation'

export default class InvitationsService {
  async create(data: Partial<Invitation>): Promise<Invitation> {
    return await Invitation.create(data)
  }

  async findById(id: string): Promise<Invitation | null> {
    return await Invitation.find(id)
  }

  async update(data: Partial<Invitation>): Promise<Invitation> {
    const invitation = await Invitation.findOrFail(data.id)
    invitation.merge(data)
    await invitation.save()
    return invitation
  }

  async delete(id: string): Promise<void> {
    const invitation = await Invitation.findOrFail(id)
    await invitation.delete()
  }
}
