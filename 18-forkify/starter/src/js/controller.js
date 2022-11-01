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
async function showRecipe() {
  try {
    const res = await fetch(
      'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
    );
    const json = await res.json();

    if(!res.ok) throw new Error(`${json.message} (${res.status})`)

    const recipe = {
      cookingTime : json.data.recipe.cooking_time,
      id: json.data.recipe.id,
      image : json.data.recipe.image_url,
      ingredients: json.data.recipe.ingredients,
      publisher: json.data.recipe.publisher,
      servings: json.data.recipe.servings,
      source: json.data.recipe.source_url,
      title: json.data.recipe.title,
    }

    console.log(json)
    console.log(recipe)

  } catch (err) {
    alert(err);
  }
}
showRecipe();
