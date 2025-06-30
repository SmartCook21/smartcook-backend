import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { cuid } from '@adonisjs/core/helpers'

@inject()
export default class AvatarController {
  async update({ request, auth, response }: HttpContext) {
    const user = auth.user!
    const avatarFile = request.file('avatar', {
      size: '4mb',
      extnames: ['jpg', 'png', 'jpeg'],
    })

    if (!avatarFile) {
      return response.badRequest({ message: 'Avatar file is required' })
    }

    if (!avatarFile.isValid) {
      return response.badRequest({
        message: 'Invalid file',
        errors: avatarFile.errors,
      })
    }

    const key = `uploads/${cuid()}.${avatarFile.extname}`
    await avatarFile.moveToDisk(key)

    user.avatar = avatarFile.meta.url
    await user.save()

    return response.ok({
      message: 'Avatar updated successfully',
      avatar: user.avatar,
    })
  }

  /*async show({ auth, response }: HttpContext) {
    const user = auth.user!

    if (!user) {
      return response.unauthorized({ message: 'User not authenticated' })
    }
    console.log(user.avatar)
    return response.ok({ avatar: user.avatar })
  }*/
}
