import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const AvatarController = () => import('#controllers/avatar_controller')

router
  .group(() => {
    router.post('/', [AvatarController, 'update'])
    //router.get('/', [AvatarController, 'show'])
  })
  .prefix('/avatar')
  .middleware(middleware.auth())
