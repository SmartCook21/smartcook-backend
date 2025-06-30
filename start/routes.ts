/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import '#routes/auth'
import '#routes/courses'
import '#routes/articles'
import '#routes/invitations'
import '#routes/tags'
import '#routes/avatar'
import AutoSwagger from 'adonis-autoswagger'
import swagger from '#config/swagger'
import router from '@adonisjs/core/services/router'
const HealthChecksController = () => import('#controllers/health_checks_controller')
const SpoonacularController = () => import('#controllers/spoonacular_controller')

// returns swagger in YAML
router.get('/swagger', async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger)
})

// Renders Swagger-UI and passes YAML-output of /swagger
router.get('/docs', async () => {
  return AutoSwagger.default.ui('/swagger', swagger)
})

router.post('/recipes', [SpoonacularController, 'findRecipesByIngredients'])
router.get('/maintenance', [HealthChecksController])
