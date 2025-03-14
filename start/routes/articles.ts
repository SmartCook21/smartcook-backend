import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const ArticlesController = () => import('#controllers/articles_controller')

router
  .group(() => {
    router.post('/courses/:courseId', [ArticlesController, 'addArticleToCourse'])
    router.get('/:id', [ArticlesController, 'show'])
    router.patch('/:id', [ArticlesController, 'update'])
    router.delete('/:id', [ArticlesController, 'delete'])
    router.post('/:articleId/tags/:tagId', [ArticlesController, 'attachTag'])
  })
  .prefix('/articles')
  .middleware(middleware.auth())
