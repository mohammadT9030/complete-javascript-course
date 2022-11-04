import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config';
import { getJSON } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
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
    if (this.state.bookmarks.some(bookmark => bookmark.id === id))
      this.state.recipe.bookmarked = true;
    else this.state.recipe.bookmarked = false;
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
    state.search.page = 1;
  } catch (err) {
    console.error('modle.js)))', err);
    throw err;
  }
}

export function getSearchResultsPage(page = state.search.page) {
  state.search.page = page;
  return state.search.results.slice(
    state.search.resultPerPage * (page - 1),
    state.search.resultPerPage * page
  );
}

export function updateServing(newServings) {
  state.recipe.ingredients.forEach(
    ing => (ing.quantity = (ing.quantity * newServings) / state.recipe.servings)
  );
  state.recipe.servings = newServings;
}

export function addBookmark(recipe) {
  // add bookmark
  state.bookmarks.push(recipe);

  // mark current recipe as bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
}

export function deleteBookmark(id) {
  const index = this.state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);
  if (id === state.recipe.id) state.recipe.bookmarked = false;
}
