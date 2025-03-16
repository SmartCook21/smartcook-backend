import env from '#start/env'
import axios from 'axios'

export default class SpoonacularService {
  async findRecipesByIngredients(
    ingredients: string,
    number = 10,
    ranking = 1,
    ignorePantry = true
  ) {
    if (!ingredients) {
      throw new Error('Les ingrédients sont requis')
    }

    try {
      const API_URL = 'https://api.spoonacular.com/recipes/findByIngredients'
      const API_KEY = env.get('SPOONACULAR_API_KEY')

      const { data } = await axios.get(API_URL, {
        params: {
          ingredients: 'tomato+salad',
          number,
          ranking,
          ignorePantry,
        },
        headers: {
          'x-api-key': API_KEY,
        },
      })

      return data
    } catch (error) {
      console.error('Erreur lors de la requête Spoonacular:', error)
      throw new Error('Erreur lors de la récupération des recettes')
    }
  }
}
