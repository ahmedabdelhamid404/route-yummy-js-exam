//? regex Values
const userNameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
const userEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const userTelTegex = /^(002)?01[0125][0-9]{8}$/;
const userAge = /^(1[5-9]|[2-7]\d|80)$/;
const userPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()-_=+]{8,}$/;

/**
 * This function initiates by selecting all input elements within the contact section.
 * It then loops through these inputs and attaches an "keyup" event listener to each one.
 *
 * The purpose of this function is to listen for keyup events on the input elements
 * within the contact section, allowing for dynamic interaction with user input.
 */

export function contactUsEventAdd() {
  const inputs = document.querySelectorAll("form input");
  for (const item of inputs) {
    item.addEventListener("keyup", function (e) {
      //? first callback function that call datavalidation function that check values using regex.test()
      dataValidation(
        e.currentTarget.getAttribute("name"),
        e.currentTarget.value
      );
      //? Validates all inputs to enable or disable a button based on their validity.
      checkButtonStatus(inputs)
        ? $("#contactUsButton").removeAttr("disabled")
        : $("#contactUsButton").attr("disabled", true);
    });
  }
}

/**
 * Determines the validation criteria based on the target input, extracts its value,
 * and uses this information to call validateState() to update the input's classes for validation.
 */
function dataValidation(target, value) {
  if (target == "userName") {
    userNameRegex.test(value)
      ? validateState(target, true, "Looks Good")
      : validateState(
          target,
          false,
          "Characters from 3-16, special characters not allowed"
        );
  } else if (target == "userEmail") {
    userEmailRegex.test(value)
      ? validateState(target, true, "Looks Good")
      : validateState(target, false, "Email not valid (exemple@domain.com)");
  } else if (target == "userTel") {
    userTelTegex.test(value)
      ? validateState(target, true, "Looks Good")
      : validateState(target, false, "Enter valid Phone Number");
  } else if (target == "userAge") {
    userAge.test(value)
      ? validateState(target, true, "Looks Good")
      : validateState(target, false, "Enter valid age between 15-80");
  } else if (target == "userPassword") {
    userPassword.test(value)
      ? validateState(target, true, "Looks Good")
      : validateState(
          target,
          false,
          "Enter valid password minimum eight characters, at least one letter and one number, special characters are allowed"
        );
  } else if (target == "userRePassword") {
    value == $('input[name="userPassword"]').val()
      ? validateState(target, true, "Looks Good")
      : validateState(target, false, "PLease re-enter password correctly");
  }
}

/**
 * Updates the classes of the target input to 'valid' or 'invalid' and toggles the visibility
 * of the validation message accordingly.
 */
function validateState(target, status, mess) {
  if (status) {
    $(`input[name="${target}"]`)
      .addClass("is-valid")
      .removeClass("is-invalid")
      .attr("data-bs-status", true);
    $(`input[name="${target}"]`)
      .next()
      .show()
      .addClass("valid-feedback")
      .removeClass("invalid-feedback")
      .html(`${mess}`);
  } else {
    $(`input[name="${target}"]`)
      .addClass("is-invalid")
      .removeClass("is-valid")
      .attr("data-bs-status", false);
    $(`input[name="${target}"]`)
      .next()
      .show()
      .addClass("invalid-feedback")
      .removeClass("valid-feedback")
      .html(`${mess}`);
  }
}

/**
 * Loops through inputs to check custom data attributes for validity.
 * Returns true if all are true, or false if any is false or empty.
 */
function checkButtonStatus(inputs) {
  for (const i of inputs) {
    if (
      $(i).attr("data-bs-status") == "false" ||
      $(i).attr("data-bs-status") == ""
    ) {
      return false;
    }
  }
  return true;
}
