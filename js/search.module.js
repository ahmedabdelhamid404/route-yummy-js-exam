import {
  renderHomeMeals,
  showLoading,
  removeLoading,
} from "./ui-render.module.js";

/**
 * This function initiates by selecting all input elements within the search section.
 * It then loops through these inputs and attaches an "keyup" event listener to each one.
 */
export function searchAddEvent() {
  $("[name='searchMealName']").keyup((event) => {
    searchMeals("name", event.target.value);
  });
  $("[name='searchMealFirstLetter']").keyup((event) => {
    searchMeals("firstLetter", event.target.value);
  });
}

/**
 * A general API call function for searching by name or ID based on the 'oper' parameter
 * and sending the 'value' to the API.
 */
async function searchMeals(oper, value) {
  showLoading();
  let response;
  if (oper == "name") {
    response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`
    );
  } else {
    if (value.length > 0) {
      /**
       * Addresses the mobile browser issue with maxlength attribute by reassigning
       * the first letter as the input value after truncating it.
       */
      $("[name='searchMealFirstLetter']").val(value.slice(0, 1));
      response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${value.slice(
          0,
          1
        )}`
      );
    } else {
      response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=a`
      );
    }
  }
  /**
   * Handles API responses, rendering results or showing 'No data found' if null.
   * It also addresses issues with Arabic characters causing undefined responses.
   */
  try {
    const { meals } = await response.json();
    if (meals) {
      renderHomeMeals(
        meals.splice(0, 20),
        "searchResultsContainer",
        "searName"
      );
    } else {
      $("#searchResultsContainer").html(
        `<span class='text-center w-100 text-white'>Not Found In Database</span>
        <img class="w-auto d-block mx-auto" src="./images/logo.png" alt="logo-image">`
      );
      removeLoading();
    }
  } catch (error) {
    $("#searchResultsContainer").html(
      `<span class='text-center w-100 text-white'>Please Enter English Character</span>
      <img class="w-auto d-block mx-auto" src="./images/logo.png" alt="logo-image">`
    );
    removeLoading();
  }
}
