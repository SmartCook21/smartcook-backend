import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const ArticlesController = () => import('#controllers/articles_controller')

router
  .group(() => {
    router.get('/', [ArticlesController, 'index'])
    router.post('/', [ArticlesController, 'create'])
    router.get('/:id', [ArticlesController, 'show'])
    router.patch('/:id', [ArticlesController, 'update'])
    router.delete('/:id', [ArticlesController, 'delete'])
    router.post('/courses/:courseId', [ArticlesController, 'addArticleToCourse'])
    router.delete('/courses/:courseId', [ArticlesController, 'removeArticleFromCourse'])
  })
  .prefix('/articles')
  .middleware(middleware.auth())
