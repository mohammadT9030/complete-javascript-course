import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultView from './views/resultView';
import PaginationView from './views/paginationView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if (module.hot) {
//   module.hot.accept();
// }

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
    resultView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;
    await model.loadSearchResults(query);
    // resultView.render(model.state.search.results);
    resultView.render(model.getSearchResultsPage(2));
    PaginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
}

function controlPagination(goToPage) {
  resultView.render(model.getSearchResultsPage(goToPage));
  PaginationView.render(model.state.search);
}

function controlServing() {
  model.updateServing(6);

  recipeView.render(model.state.recipe);
}

function init() {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  PaginationView.addHandlerClick(controlPagination);
}

init();
