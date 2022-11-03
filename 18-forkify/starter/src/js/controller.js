import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
async function controlRecipes() {
  try {
    if (!(id = window.location.hash.slice(1))) return;
    recipeView.renderSpinner(recipeContainer);

    // 1) get data (loading recipe)
    await model.loadRecipe(id);

    // 2) render data
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderErrorMessage();
  }
}

async function controlSearchResults() {
  try {
    const query = searchView.getQuery();
    if (!query) return;
    await model.loadSearchResults(query);
  } catch (err) {
    console.log(err);
  }
}

function init() {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults)
}

init();
