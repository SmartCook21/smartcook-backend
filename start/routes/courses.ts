import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const CoursesController = () => import('#controllers/courses_controller')

router
  .group(() => {
    router.post('/', [CoursesController, 'create'])
    router.get('/:id', [CoursesController, 'show'])
    router.patch('/:id', [CoursesController, 'update'])
    router.delete('/:id', [CoursesController, 'delete'])
  })
  .prefix('/courses')
  .middleware(middleware.auth())
