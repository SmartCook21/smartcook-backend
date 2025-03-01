import AuthSocialService from '#services/auth_social'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import env from '#start/env'

@inject()
export default class SocialController {
  constructor(protected authSocialService: AuthSocialService) {}

  async redirect({ ally, params, request, session }: HttpContext) {
    const ref = request.input('ref')
    if (ref && ref !== '') {
      session.put('ref', ref)
    }
    return ally.use(params.provider).redirect()
  }

  async callback({ response, auth, params, session }: HttpContext) {
    const wasAuthenticated = !!auth.user
    const ref = session.pull('ref')
    const { success, user } = await this.authSocialService.getUser(params.provider, ref)

    if (!success) {
      return response.redirect(env.get('FRONTEND_DOMAIN'))
    }

    await auth.use('web').login(user!, true)

    if (wasAuthenticated) {
      return response.ok({
        message: `Your ${params.provider} account has been successfully linked`,
      })
    }

    return response.redirect(env.get('FRONTEND_DOMAIN'))
  }
}
