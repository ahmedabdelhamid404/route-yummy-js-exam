import { detailsApiCall, filterApiCall } from "./api-calls.module.js";

//? Show Loading Function
export function showLoading() {
  $(".AJAX").css("display", "flex");
}

//? Hide Loading Function
export function removeLoading() {
  $(".AJAX").fadeOut(500);
}

//? Renders data as meal cards in the specified section.
export function renderHomeMeals(meals, section, id) {
  let cartoona = "";
  for (const meal of meals) {
    cartoona += `<div id="${id}" class="col-md-3" data-bs-key="${meal.idMeal}">
          <div class="item position-relative overflow-hidden">
            <img src="${meal.strMealThumb}" alt="Meal Image" />
            <div class="cover fs-3 text-center">${meal.strMeal}</div>
          </div>
        </div>`;
  }
  $(`#${section}`).html(cartoona);
  //? to handle the scroll part when user open new section it will scroll to the top page
  $("html, body").animate({ scrollTop: "0px" }, 0);
  removeLoading();
  /**
   * Adds an event listener to the cards with the specified ID and attaches
   * the provided callback function as their event handler.
   */
  addClickEvent(id, detailsApiCall);
}

//? Render Categories List
export function renderCategoryMeals(categories) {
  let cartoona = "";
  for (const category of categories) {
    cartoona += `<div id="categoryMeal" class="col-md-3" data-bs-key="${
      category.strCategory
    }">
    <div class="item position-relative overflow-hidden">
      <img src="${category.strCategoryThumb}" alt="Meal Image" />
      <div class="cover fs-3 text-center px-2">
        <h3>${category.strCategory}</h3>
        <p class="fs-6">${category.strCategoryDescription
          .split(" ")
          .splice(0, 20)
          .join(" ")} <br> see more...</p>
      </div>
    </div>
  </div>`;
  }
  $("#mealsCategories").html(cartoona);
  removeLoading();
  /**
   * Adds an event listener to cards with the given ID, attaching the provided callback function
   * as the event handler. Additionally, it passes the operation and target section
   * for API data fetching within the callback function.
   */
  addClickEvent("categoryMeal", filterApiCall, "c", "mealsCategories");
}

//? Render Area List
export function renderArea(data, sectionName, id) {
  let cartoona = "";
  for (const i of data) {
    cartoona += `<div id="${id}" class="col-md-3" data-bs-key="${i.strArea}">
      <div class="item overflow-hidden mb-2">
        <img src="./images/area-image.jpg" alt="Map Areas" />
      </div>
      <div class="fs-3 text-center text-white">${i.strArea}
      </div>
    </div>`;
  }
  $(`#${sectionName}`).html(cartoona);
  removeLoading();
  /**
   * Adds an event listener to cards with the given ID, attaching the provided callback function
   * as the event handler. Additionally, it passes the operation and target section
   * for API data fetching within the callback function.
   */
  addClickEvent(`${id}`, filterApiCall, "a", sectionName);
}

//? Render Gradients List
export function renderGradiendt(data, sectionName, id) {
  let cartoona = "";
  for (const i of data) {
    cartoona += `<div id="${id}" class="col-md-3" data-bs-key="${
      i.strIngredient
    }">
      <div class="item overflow-hidden mb-2">
        <img src="./images/imgredients-image.jpg" alt="Map Areas" />
      </div>
      <div class="fs-3 text-center text-white">
      <h3>${i.strIngredient}</h3>
      <p class="fs-6">${
        i.strDescription
          ? i.strDescription.split(" ").splice(0, 20).join(" ")
          : "No Description"
      }</p>
      </div>
    </div>`;
  }
  $(`#${sectionName}`).html(cartoona);
  removeLoading();
  /**
   * Adds an event listener to cards with the given ID, attaching the provided callback function
   * as the event handler. Additionally, it passes the operation and target section
   * for API data fetching within the callback function.
   */
  addClickEvent(`${id}`, filterApiCall, "i", sectionName);
}

/**
 * Adds click event listeners to cards with the specified DOMId.
 * The callback function depends on the operation (oper) and section name,
 * either rendering meal details or fetching data for a specific category, area, or search.
 */
function addClickEvent(DOMId, callBackFn, oper, sectioName) {
  const elements = document.querySelectorAll("#" + DOMId);
  for (const i of elements) {
    i.addEventListener("click", (e) => {
      showLoading();
      callBackFn(e.currentTarget.getAttribute("data-bs-key"), oper, sectioName);
    });
  }
}

export function renderMealDetail(meal) {
  //? store last displayed section id in variable to reuse it if i want to go back to this section
  const lastSectionDisplayed = $(".main-container").children(".d-block").attr("id");
  //? to handle the scroll part when user open new section it will scroll to the top page
  $("html, body").animate({ scrollTop: "0px" }, 0);
  //? this part to handle replacing d-block & d-none classes to display the current section & remove all other siblings sections
  $("#mealDetails").addClass("d-block").removeClass("d-none");
  $("#mealDetails").siblings().addClass("d-none").removeClass("d-block");
  //? declaring some variables & arrays to contain the reponse data
  const newMeal = new Map(Object.entries(meal));
  const ingredients = [];
  const measurments = [];
  let recipeCartoona = "";
  let tagsCartoona = "";
  //? data binding the response of the meal details inside the html DOC
  $("#mealDetailsImage").attr("src", meal.strMealThumb);
  $("#mealName").html(meal.strMeal);
  $("#mealInstructions").html(meal.strInstructions);
  $("#mealArea").html(meal.strArea);
  $("#mealCategory").html(meal.strCategory);
  //? validate meal website found or not
  meal.strSource
    ? $("#mealWebSite")
        .attr("href", meal.strSource)
        .html(`<i class="fa-solid fa-globe me-2"></i><span>Source </span>`)
    : $("#mealWebSite").html("Not Found").removeAttr("href");
  //? validate meal website found or not
  meal.strYoutube
    ? $("#mealVideo")
        .attr("href", meal.strYoutube)
        .html(`<i class="fa-brands fa-youtube me-2"></i><span>YouTube </span>`)
    : $("#mealVideo").html("Not Found").removeAttr("href");
  //? validate tags if they are trully values not null or ""
  if (meal.strTags) {
    //? separate tags & creating new array
    const tags = meal.strTags.split(",");
    for (let i of tags) {
      tagsCartoona += `<span class="tags">${i}</span>`;
    }
  } else {
    tagsCartoona = `<span class="tags">No Tags</span>`;
  }
  //? data binde the tags inside the html doc
  $("#mealTags").html(tagsCartoona);
  //? looping on Map to extract ingredients & push them into two separate arrays to concatenate them
  for (const [key, value] of newMeal) {
    if (key.includes("strIngredient") && value) {
      ingredients.push(value);
    }
    if (key.includes("strMeasure") && value) {
      measurments.push(value);
    }
  }
  //? Looping on the two separate arrays to concatenate ingredients with measurments
  for (let i = 0; i < ingredients.length; i++) {
    recipeCartoona += `<span class="recipe-detail">${measurments[i]} ${ingredients[i]}</span>`;
  }
  //? data binde the recipe after concatenating them into html doc
  $("#recipeContainer").html(recipeCartoona);
  //? return to previous displayed section by displaying it & hide all sibling sections
  $("#closeMealDetailsSection").click(function () {
    $("#" + lastSectionDisplayed)
      .addClass("d-block")
      .removeClass("d-none");
    $("#" + lastSectionDisplayed)
      .siblings()
      .addClass("d-none")
      .removeClass("d-block");
  });
  removeLoading();
}
