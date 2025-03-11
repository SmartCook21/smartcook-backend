import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import InvitationsService from '#services/invitations_service'

@inject()
export default class InvitationsController {
  constructor(private invitationsService: InvitationsService) {}

  async create({ request, response }: HttpContext) {
    const data = request.only(['course_id', 'token', 'state', 'invited_email'])
    const invitation = await this.invitationsService.create(data)
    return response.created(invitation)
  }

  async show({ request, response }: HttpContext) {
    const { id } = request.only(['id'])
    const invitation = await this.invitationsService.findById(id)
    return response.ok(invitation)
  }

  async delete({ request, response }: HttpContext) {
    const { id } = request.only(['id'])
    await this.invitationsService.delete(id)
    return response.noContent()
  }
}
