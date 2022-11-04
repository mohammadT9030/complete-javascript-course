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

    // 0) update resualt view to mark selected search resualt
    resultView.update(model.getSearchResultsPage());

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
    resultView.render(model.getSearchResultsPage());
    PaginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
}

function controlPagination(goToPage) {
  resultView.render(model.getSearchResultsPage(goToPage));
  PaginationView.render(model.state.search);
}

function controlServing(newServings) {
  console.log('controlserving', newServings);
  model.updateServing(newServings);

  recipeView.update(model.state.recipe);
  // recipeView.render(model.state.recipe);
}

function controlBookmark() {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  recipeView.update(model.state.recipe);
}

function init() {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServing);
  recipeView.addHandlerAddBookmark(controlBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  PaginationView.addHandlerClick(controlPagination);
}

init();
