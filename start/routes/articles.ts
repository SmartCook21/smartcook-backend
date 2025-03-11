import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const ArticlesController = () => import('#controllers/articles_controller')

router
  .group(() => {
    router.post('/courses/:courseId/articles', [ArticlesController, 'addArticleToCourse'])
    router.get('/articles/:id', [ArticlesController, 'show'])
    router.patch('/articles/:id', [ArticlesController, 'update'])
    router.delete('/articles/:id', [ArticlesController, 'delete'])
    router.post('/articles/:articleId/tags/:tagId', [ArticlesController, 'attachTag'])
  })
  .prefix('/articles')
  .middleware(middleware.auth())
