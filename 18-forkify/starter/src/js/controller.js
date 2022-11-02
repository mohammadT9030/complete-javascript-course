import * as model from './model';
import recipeView from './views/recipeView';

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
    recipeView.render(model.state.recipe)
    
  } catch (err) {
    console.error(err);
  }
}

function init() {
  recipeView.addHandlerRender(controlRecipes)
}

init();
