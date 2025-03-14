import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const TagsListsController = () => import('#controllers/tags_lists_controller')

router
  .group(() => {
    router.post('/', [TagsListsController, 'create'])
    router.get('/:id', [TagsListsController, 'show'])
    router.patch('/:id', [TagsListsController, 'update'])
    router.delete('/:id', [TagsListsController, 'delete'])
  })
  .prefix('/tags')
  .middleware(middleware.auth())
