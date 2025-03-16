import SpoonacularService from '#services/spoonacular_service'
import { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'

@inject()
export default class SpoonacularController {
  constructor(protected spoonacularService: SpoonacularService) {}

  async findRecipesByIngredients({ request, response }: HttpContext) {
    try {
      const ingredients = request.input('ingredients')
      const number = request.input('number', 10)
      const ranking = request.input('ranking', 1)
      const ignorePantry = request.input('ignorePantry', true)

      const recipes = await this.spoonacularService.findRecipesByIngredients(
        ingredients,
        number,
        ranking,
        ignorePantry
      )
      return response.ok(recipes)
    } catch (error) {
      return response.internalServerError({ message: error.message })
    }
  }
}
