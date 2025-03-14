import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const InvitationsController = () => import('#controllers/invitations_controller')

router
  .group(() => {
    router.post('/', [InvitationsController, 'create'])
    router.get('/:id', [InvitationsController, 'show'])
    router.delete('/:id', [InvitationsController, 'delete'])
  })
  .prefix('/invitations')
  .middleware(middleware.auth())
