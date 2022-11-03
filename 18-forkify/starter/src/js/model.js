import { async } from 'regenerator-runtime';
import { API_URL } from './config';
import { getJSON } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    page: 1,
    results: [],
  },
};

export async function loadRecipe(id) {
  try {
    const json = await getJSON(`${API_URL + id}`);
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
    console.error('modle.js)))', err);
    throw err;
  }
}

export async function loadSearchResults(query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map(recipe => ({
      id: recipe.id,
      image: recipe.image_url,
      publisher: recipe.publisher,
      title: recipe.title,
    }));
  } catch (err) {
    console.error('modle.js)))', err);
    throw err;
  }
}

export function getSearchResultsPage(page = state.search.page) {}
