import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultView from './views/resultView';
import PaginationView from './views/paginationView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import bookmarksView from './views/bookmarksView';

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
    bookmarksView.update(model.state.bookmarks)

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
  model.updateServing(newServings);

  recipeView.update(model.state.recipe);
  // recipeView.render(model.state.recipe);
}

function controlBookmark() {
  // Add/Remove bookmarks
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // Update view
  recipeView.update(model.state.recipe);

  // Render bookmarks
  bookmarksView.render(model.state.bookmarks)
}

function firstLoadingBookmarks() {
  bookmarksView.render(model.state.bookmarks)
}

function init() {
  bookmarksView.addHandlerRender(firstLoadingBookmarks)
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServing);
  recipeView.addHandlerAddBookmark(controlBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  PaginationView.addHandlerClick(controlPagination);
}

init();
