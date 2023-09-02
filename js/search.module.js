import { renderHomeMeals, showLoading } from "./ui-render.module.js";

/**
 * This function initiates by selecting all input elements within the search section.
 * It then loops through these inputs and attaches an "keyup" event listener to each one.
 */
export function searchAddEvent() {
  $("[name='searchMealName']").keyup((event) => {
    searchMeals("name", event.target.value);
  });
  $("[name='searchMealFirstLetter']").keyup((event) => {
    searchMeals("name", event.target.value);
  });
}

/**
 * A general API call function for searching by name or ID based on the 'oper' parameter
 * and sending the 'value' to the API.
 */
async function searchMeals(oper, value) {
  let response;
  if (oper == "name") {
    response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`
    );
  } else {
    response = await fetch(
      `www.themealdb.com/api/json/v1/1/search.php?f=${value.slice(0, 1)}`
    );
  }
  /**
   * Checks the API response: if it's an array of objects, it calls 'renderHome' to display results;
   * if it's null, it prints 'No data found' to the user.
   */
  const { meals } = await response.json();
  if (meals) {
    showLoading();
    renderHomeMeals(meals.splice(0, 20), "searchResultsContainer", "searName");
  } else {
    $("#searchResultsContainer").html(
      `<span class='text-center w-100 text-white'>Not Found In Database</span>
      <img class="w-auto d-block mx-auto" src="./images/logo.png" alt="logo-image">`
    );
  }
}
