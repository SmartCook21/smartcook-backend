import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const SocialController = () => import('#controllers/auth/social_controller')
const VerifyEmailController = () => import('#controllers/auth/verify_email_controller')
const AuthController = () => import('#controllers/auth/auth_controller')

router
  .group(() => {
    router.post('/signin', [AuthController, 'login']).as('auth.signin')
    router.post('/signup', [AuthController, 'register']).as('auth.signup')
    router.get('/me', [AuthController, 'me']).as('auth.me')
    router
      .post('/logout', [AuthController, 'logout'])
      .as('auth.logout')
      .middleware(middleware.auth())
    router.post('/verify/email/:token', [VerifyEmailController, 'verify']).as('auth.email.verify')
    router
      .post('/email/resend', [VerifyEmailController, 'resendVerifyEmail'])
      .as('auth.email.resend')
    router
      .patch('/password', [AuthController, 'changePassword'])
      .as('auth.password.reset')
      .middleware(middleware.auth())
    router.post('/password/send', [AuthController, 'send']).as('auth.password.send')
    router.post('/password/store', [AuthController, 'store']).as('auth.password.store')
    router.get('/:provider/redirect', [SocialController, 'redirect'])
    router.get('/:provider/callback', [SocialController, 'callback'])
  })
  .prefix('auth')
