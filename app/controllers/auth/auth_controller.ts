import type { HttpContext } from '@adonisjs/core/http'
import { signInValidator } from '#validators/auth/sign_in'
import { getClientIp } from '#utils/client_ip'
import app from '@adonisjs/core/services/app'
import { verifyTurnstileToken } from '#utils/verify'
import limiter from '@adonisjs/limiter/services/main'
import RateLimitException from '#exceptions/rate_limit_exception'
import User from '#models/user'
import { newPasswordValidator } from '#validators/auth/request_new_password'
import Token from '#models/token'
import vine from '@vinejs/vine'
import { changePasswordSchema } from '#validators/auth/auth'
import { signUpValidator } from '#validators/auth/sign_up'

export default class AuthController {
  async login({ request, response, auth }: HttpContext) {
    const data = request.all()
    const payload = await signInValidator.validate(data)
    const { email, password, remember } = payload
    const throttleKey = `login_${email}_${await getClientIp(request)}`

    /*if (app.inProduction) {
      if (payload.turnstileToken && payload.turnstileToken !== '') {
        if (!(await verifyTurnstileToken(payload.turnstileToken))) {
          return response.badRequest({
            success: false,
            message: 'Failed to verify captcha',
          })
        }
      } else {
        return response.badRequest({
          success: false,
          message: 'Please complete the captcha',
        })
      }
    }*/

    const limit = limiter.use('database', {
      requests: 10,
      duration: '5 mins',
      blockDuration: '5 mins',
    })

    if (await limit.isBlocked(throttleKey)) {
      throw new RateLimitException()
    }

    await limit.increment(throttleKey)

    const useOTP = await User.query().where('email', email).first()

    // Vérification si l'utilisateur utilise Google pour se connecter (password vide)
    if (useOTP && !useOTP.password) {
      return response.badRequest({
        success: false,
        message: 'Please use google to connect to this account.',
      })
    }

    const user = await User.verifyCredentials(email, password)

    await auth.use('web').login(user, !!remember)
    return response.ok({ success: true, email })
  }

  async register({ request, response }: HttpContext) {
    const data = request.all()

    const payload = await signUpValidator.validate(data)

    /*if (app.inProduction) {
      if (payload.turnstileToken && payload.turnstileToken !== '') {
        if (!(await verifyTurnstileToken(payload.turnstileToken))) {
          return response.badRequest({
            success: false,
            message: 'Failed to verify captcha',
          })
        }
      } else {
        return response.badRequest({
          success: false,
          message: 'Please complete the captcha',
        })
      }
    }*/

    const throttleKey = `register_${await getClientIp(request)}`
    const limit = limiter.use('database', {
      requests: 2,
      duration: '5 mins',
      blockDuration: '30 mins',
    })

    if (await limit.isBlocked(throttleKey)) {
      throw new RateLimitException()
    }

    await limit.increment(throttleKey)

    const user = await User.create({
      email: payload.email,
      password: payload.password,
      emailVerified: true,
    })

    // await user.sendVerifyEmail()
    return response.ok({
      success: true,
      message: 'email: ' + user.email + ' pwd: ' + user.password,
    })
  }

  async logout({ response, auth }: HttpContext) {
    try {
      await auth.use('web').logout()
      return response.ok({ revoked: true, message: 'Logout successfully' })
    } catch (error) {
      return response.badRequest({ error: error })
    }
  }

  async send({ request, response }: HttpContext) {
    const data = request.all()
    const { email, turnstileToken } = await newPasswordValidator.validate(data)
    const user = await User.findBy('email', email)
    const token = await Token.generatePasswordResetToken(user)

    const throttleKey = `forgot_password_${await getClientIp(request)}`

    const limit = limiter.use('database', {
      requests: 2,
      duration: '30 mins',
      blockDuration: '30 mins',
    })

    if (await limit.isBlocked(throttleKey)) {
      throw new RateLimitException()
    }

    await limit.increment(throttleKey)

    /*if (app.inProduction) {
      if (turnstileToken && turnstileToken !== '') {
        if (!(await verifyTurnstileToken(turnstileToken))) {
          return response.badRequest({
            success: false,
            message: 'Failed to verify captcha',
          })
        }
      } else {
        return response.badRequest({
          success: false,
          message: 'Please complete the captcha',
        })
      }
    }*/

    if (user) {
      /*await mail.sendLater(new PasswordResetNotification(user, token))*/
      return response.ok({
        success: true,
        message: 'If an email match, you gonna receive a reset link.',
      })
    } else {
      return response.notFound({
        success: false,
        message: "This email doesn't match with any account.",
      })
    }
  }

  async store({ request, response, auth }: HttpContext) {
    const data = request.all()
    const passwordSchema = vine.compile(
      vine.object({
        token: vine.string(),
        password: vine.string().minLength(8),
        turnstileToken: vine.string().optional(),
      })
    )

    const { token, password, turnstileToken } = await passwordSchema.validate(data)
    const user = await Token.getTokenUser(token, 'PASSWORD_RESET')

    if (!user) {
      return response.notFound({
        success: false,
        message: 'Token expired or associated user could not be found.',
      })
    }

    /*if (app.inProduction) {
      if (turnstileToken && turnstileToken !== '') {
        if (!(await verifyTurnstileToken(turnstileToken))) {
          return response.badRequest({
            success: false,
            message: 'Failed to verify captcha',
          })
        }
      } else {
        return response.badRequest({
          success: false,
          message: 'Please complete the captcha',
        })
      }
    }*/

    await user.merge({ password }).save()
    await auth.use('web').login(user)
    await Token.expireTokens(user, 'passwordResetTokens')
    return response.ok({
      success: true,
      message: 'Password change successfully. Please reconnect.',
    })
  }

  async changePassword({ request, response, auth }: HttpContext) {
    const data = request.all()

    const { oldPassword, newPassword, turnstileToken } = await changePasswordSchema.validate(data)
    const user = auth.user!

    /*if (app.inProduction) {
      if (turnstileToken && turnstileToken !== '') {
        if (!(await verifyTurnstileToken(turnstileToken))) {
          return response.badRequest({
            success: false,
            message: 'Failed to verify captcha',
          })
        }
      } else {
        return response.badRequest({
          success: false,
          message: 'Please complete the captcha',
        })
      }
    }*/

    try {
      await User.verifyCredentials(user.email, oldPassword)
    } catch (e) {
      return response.unauthorized({ success: false, message: 'Current password is incorrect' })
    }

    await user.merge({ password: newPassword }).save()
    await auth.use('web').logout()
    return response.ok({
      success: true,
      message: 'Password change successfuly. Please reconnect.',
    })
  }

  async me({ auth, response }: HttpContext) {
    let user = await User.query().where('id', auth.user!.id).first()
    return response.ok(user)
  }
}
