import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const InvitationsController = () => import('#controllers/invitations_controller')

router
  .group(() => {
    router.post('/invitations', [InvitationsController, 'create'])
    router.get('/invitations/:id', [InvitationsController, 'show'])
    router.delete('/invitations/:id', [InvitationsController, 'delete'])
  })
  .prefix('/invitations')
  .middleware(middleware.auth())
