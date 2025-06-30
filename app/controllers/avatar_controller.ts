import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import env from '#start/env'

const s3 = new S3Client({
  region: env.get('SCW_REGION'),
  endpoint: env.get('SCW_ENPOINT'),
  credentials: {
    accessKeyId: env.get('SCW_ACCESS_KEY'),
    secretAccessKey: env.get('SCW_SECRET_KEY'),
  },
})

@inject()
export default class AvatarController {
  async update({ request, auth, response }: HttpContext) {
    const user = auth.user!
    const avatarFile = request.file('avatar', {
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg'],
    })

    if (!avatarFile) {
      return response.badRequest({ message: 'Avatar file is required' })
    }
  }
}
