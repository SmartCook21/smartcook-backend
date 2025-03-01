import type { HttpContext } from '@adonisjs/core/http'
import Token from '#models/token'
import { inject } from '@adonisjs/core'
import { resendVerifyEmailValidator } from '#validators/auth/auth'
import { getClientIp } from '#utils/client_ip'
import limiter from '@adonisjs/limiter/services/main'
import RateLimitException from '#exceptions/rate_limit_exception'
import User from '#models/user'

@inject()
export default class VerifyEmailController {
  async verify({ response, params }: HttpContext) {
    const token = params.token

    const isValid = await Token.verify(token, 'VERIFY_EMAIL')

    if (isValid) {
      const customer = await Token.getTokenUser(token, 'VERIFY_EMAIL')
      if (customer) {
        customer.isEmailVerified = true
        await customer.save()
        await Token.expireTokens(customer, 'verifyEmailTokens')
        return response.ok({
          success: true,
          message: 'Email successfuly verified.',
          token: token,
        })
      }
    } else {
      return response.notFound({ success: false, message: 'Your token is invalid or expired.' })
    }
  }

  async resendVerifyEmail({ request, response }: HttpContext) {
    const data = request.all()
    const payload = await resendVerifyEmailValidator.validate(data)
    const throttleKey = `resend_email_${await getClientIp(request)}`
    const limit = limiter.use('database', {
      requests: 2,
      duration: '5 mins',
      blockDuration: '30 mins',
    })

    if (await limit.isBlocked(throttleKey)) {
      throw new RateLimitException()
    }

    await limit.increment(throttleKey)
    const user = await User.findBy('email', payload.email)

    if (!user) {
      return response.ok({ message: 'Verification email sent' })
    }

    await user.sendVerifyEmail()
    return response.ok({ message: 'Verification email sent' })
  }
}
