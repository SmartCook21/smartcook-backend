import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import InvitationsService from '#services/invitations_service'
import { createInvitationValidator } from '#validators/invitation_validator'

@inject()
export default class InvitationsController {
  constructor(private invitationsService: InvitationsService) {}

  async create({ request, response }: HttpContext) {
    const data = await request.validateUsing(createInvitationValidator)
    const invitation = await this.invitationsService.create(data)
    return response.created(invitation)
  }

  async show({ params, response }: HttpContext) {
    const invitation = await this.invitationsService.findById(params.id)
    return response.ok(invitation)
  }

  async delete({ params, response }: HttpContext) {
    await this.invitationsService.delete(params.id)
    return response.noContent()
  }
}
