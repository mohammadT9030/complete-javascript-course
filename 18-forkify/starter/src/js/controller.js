import 'core-js/stable'
import 'regenerator-runtime/runtime'
import icons from 'url:../img/icons.svg'

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
function renderSpinner(parentEl) {
  console.log(parentEl)
  const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
  `;
  parentEl.innerHtml = '';
  parentEl.insertAdjacentHTML('afterbegin', markup);
}
async function showRecipe() {
  try {
    // 1) get data (loading recipe)
    renderSpinner(recipeContainer);
    const res = await fetch(
      'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
    );
    const json = await res.json();

    if (!res.ok) throw new Error(`${json.message} (${res.status})`);

    const recipe = {
      cookingTime: json.data.recipe.cooking_time,
      id: json.data.recipe.id,
      image: json.data.recipe.image_url,
      ingredients: json.data.recipe.ingredients,
      publisher: json.data.recipe.publisher,
      servings: json.data.recipe.servings,
      source: json.data.recipe.source_url,
      title: json.data.recipe.title,
    };

    // 2) render data
    const markup = `

    `;
  } catch (err) {
    alert(err);
  }
}
showRecipe();
