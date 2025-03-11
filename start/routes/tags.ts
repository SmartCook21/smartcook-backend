import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const TagsListsController = () => import('#controllers/tags_lists_controller')

router
  .group(() => {
    router.post('/tags', [TagsListsController, 'create'])
    router.get('/tags/:id', [TagsListsController, 'show'])
    router.patch('/tags/:id', [TagsListsController, 'update'])
    router.delete('/tags/:id', [TagsListsController, 'delete'])
  })
  .prefix('/tags')
  .middleware(middleware.auth())
