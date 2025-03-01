import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class RateLimitException extends Exception {
  constructor() {
    super("You are currently rate-limited. If you think it's an error, please contact support.", {
      status: 401,
      code: 'E_RATE_LIMIT',
    })
  }

  async handle(error: this, ctx: HttpContext) {
    ctx.response.status(error.status).send({ message: error.message, name: this.name })
  }
}
