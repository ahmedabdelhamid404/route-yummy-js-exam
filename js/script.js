//? imports from other modules
import {
  areaIngredApiCall,
  categoriesApiCall,
  homeApiCall,
} from "./api-calls.module.js";
import { contactUsEventAdd } from "./contact.module.js";
import { searchAddEvent } from "./search.module.js";
import { showLoading } from "./ui-render.module.js";

//? fading out the onLoad Spinner
$(document).ready(function () {
  $(".onLoad").fadeOut(600);
  $("body").css("overflow", "auto");
});

/**
 * This NavBar script automatically closes the navbar on website rendering,
 * handles link clicks by toggling the display of sibling sections,
 * initiates API calls and result rendering for the clicked section,
 * and manages loading indicators.
 */
$("nav ul li a").click((e) => {
  //? auto close navbar
  $("nav").animate({ left: `${-navSectionWidth}px` }, 400);
  $("nav li").animate(
    {
      top: "300px",
    },
    500
  );
  $("#closeNavbarBtn").fadeOut(400, () => {
    $("#openNavbarBtn").fadeIn(400);
  });
  //? handle which click you clicked
  const href = $(e.target).attr("href");
  //? show desired section & d-none others
  $(`${href}`).addClass("d-block").removeClass("d-none");
  $(`${href}`).siblings().addClass("d-none").removeClass("d-block");
  //? detect which link you clicked to call the desired function
  if (href == "#home") {
    showLoading();
    homeApiCall();
  } else if (href == "#search") {
    searchAddEvent();
  } else if (href == "#categories") {
    showLoading();
    categoriesApiCall();
  } else if (href == "#area") {
    showLoading();
    /**
     * The below function takes three parameters:
     * 1. ${area}: The value used in the API URL.
     * 2. ${renderSection}: The HTML section where the results will be displayed.
     * 3. ${cardClickCallback}: A callback function attached to generated cards.
     *    When a card is clicked (e.g., "Australia"), it's called with the data-bs-code
     *    from the API response for that card.
     *
     * It then passes ${area} to the render function in the ui-render module
     * to display the results in ${renderSection}.
     */
    areaIngredApiCall("a", "mealsArea", "filterArea");
  } else if (href == "#ingredients") {
    showLoading();
    /**
     * Similar to the previous function, this one also takes three parameters:
     * 1. ${area}: The value used in the API URL.
     * 2. ${renderSection}: The HTML section where the results will be displayed.
     * 3. ${cardClickCallback}: A callback function attached to generated cards.
     *    When a card is clicked (e.g., "Australia"), it calls ${filterIngredients()}
     *    and renders the results in a different section.
     *
     * This function serves a similar purpose to the previous one but triggers
     * a different callback function (${filterIngredients()}) upon card click.
     */
    areaIngredApiCall("i", "mealsImgredients", "filterIngredients");
  } else if (href == "#contactus") {
    contactUsEventAdd();
  }
});

//? get variable section width of navbar
let navSectionWidth = $(".nav-section").outerWidth();
$("nav").css("left", `${-navSectionWidth}px`);
$("nav li").animate({
  top: "300px",
});

//? open navbar
$("#openNavbarBtn").click(function () {
  $("nav").animate({ left: "0px" }, 400);
  $("#openNavbarBtn").fadeOut(400, () => {
    $("#closeNavbarBtn").fadeIn(400);
  });
  for (let i = 0; i < 6; i++) {
    $("nav li")
      .eq(i)
      .animate(
        {
          top: "0px",
        },
        (i + 6) * 100
      );
  }
});

//? close navbar
$("#closeNavbarBtn").click(function () {
  $("nav li").animate(
    {
      top: "300px",
    },
    500
  );
  $("nav").animate({ left: `${-navSectionWidth}px` }, 400);
  $("#closeNavbarBtn").fadeOut(400, () => {
    $("#openNavbarBtn").fadeIn(400);
  });
});

//? when the window resize it adjust the variable width of navbar
window.addEventListener("resize", function () {
  navSectionWidth = $(".nav-section").outerWidth();
  if ($("nav").css("left") < "0px") {
    $("nav").css("left", `${-navSectionWidth}px`);
  }
});

//? start home section function to render home meals when website open
homeApiCall();
