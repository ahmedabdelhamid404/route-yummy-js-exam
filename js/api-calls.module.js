import {
  renderArea,
  renderCategoryMeals,
  renderGradiendt,
  renderHomeMeals,
  renderMealDetail,
} from "./ui-render.module.js";

//? This function is the starter function to get APi home meals
export async function homeApiCall() {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s="
  );
  const { meals } = await response.json();
  /**
   * Calls the 'renderHomeMeals' function to display meals based on user-selected parameters
   * such as category, area, ingredient, or search query, passing relevant data and rendering details.
   */
  renderHomeMeals(meals.splice(0, 20), "mealsContainer", "h");
}

//? Calls the API for each meal card, passing a unique linked ID.
export async function detailsApiCall(id) {
  const reponse = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const { meals } = await reponse.json();
  //? Renders meal details after selecting a meal, fetching its data from the API using its ID.
  renderMealDetail(meals[0]);
}

//? This function calls categories from APi
export async function categoriesApiCall() {
  const reponse = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  const { categories } = await reponse.json();
  //? Renders meal categories list.
  renderCategoryMeals(categories);
}

/**
 * Performs a general API call to filter data based on user selections of category, area, or ingredients
 * for meals, following the rendering of all categories, areas, or ingredients.
 */
export async function filterApiCall(key, oper, sectionName) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?${oper}=${key}`
  );
  const { meals } = await response.json();
  /**
   * Calls the 'renderHomeMeals' function to display meals based on user-selected parameters
   * such as category, area, ingredient, or search query, passing relevant data and rendering details.
   */
  renderHomeMeals(meals.splice(0, 20), sectionName, oper);
}

/**
 * Fetches area and ingredient lists based on the 'oper' argument and calls
 * specific render functions accordingly.
 */
export async function areaIngredApiCall(oper, sectionName, id) {
  const reponse = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?${oper}=list`
  );
  const { meals } = await reponse.json();
  if (id == "filterArea") {
    renderArea(meals.splice(0, 20), sectionName, id);
  } else {
    renderGradiendt(meals.splice(0, 20), sectionName, id);
  }
}
