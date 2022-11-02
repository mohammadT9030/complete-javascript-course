import { async } from 'regenerator-runtime';
import { API_URL } from './config';
import { getJSON } from './helpers';

export const state = {
  recipe: {},
};

export async function loadRecipe(id) {
  try {
    const json = await getJSON(`${API_URL}/${id}`)
    state.recipe = {
      cookingTime: json.data.recipe.cooking_time,
      id: json.data.recipe.id,
      image: json.data.recipe.image_url,
      ingredients: json.data.recipe.ingredients,
      publisher: json.data.recipe.publisher,
      servings: json.data.recipe.servings,
      source: json.data.recipe.source_url,
      title: json.data.recipe.title,
    };
  } catch (err) {
    console.error('modle.js:)(',err);
  }
}
