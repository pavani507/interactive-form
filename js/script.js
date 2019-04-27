const name = $("#name");
const otherTitle = $("#other-title");
const title = $("#title");
const activity = $(".activities label");
const totalAmount = $(".activities");
const design = $("#design");
const color = $("#color option");
const payment = $("#payment option");

const hideSpan = $("<span />").appendTo(totalAmount);
hideSpan.hide();
$("#colors-js-puns label").text("Please select a T-shirt theme:");
$("#color").hide();

//When the page first loads, the first text field should be in focus by default.
name.focus();

//'Other' field is  hide it initially with JS.
otherTitle.hide();

//when the "Other" option is selected from the "Job Role" drop down menu. it will show.
$(title).change(function() {
  var $option = $(this).find("option:selected");
  otherTitle.hide();
  var text = $option.text();
  if (text === "Other") {
    otherTitle.show();
  }
});

$(design).change(function() {
  var $option = $(this).find("option:selected");
  var text = $option.text();

  if (/JS Puns/.test(text)) {
    $("#color").show();
    matchColor("JS Puns");
    changeColorText("Color:");
  } else if (/I/.test(text)) {
    $("#color").show();
    changeColorText("Color:");
    matchColor("I");
  } else if (/Select Theme/.test(text)) {
    matchColor("Select Theme");
    $("#color").hide();
  }
});

//Change
function changeColorText(text) {
  $("#colors-js-puns label").text(text);
}
function matchColor(text) {
  $(color).each(function(index, item) {
    const t = $(item).text();

    console.log(t);
    if (text == "JS Puns") {
      if (!/JS Puns/.test(t)) {
        $(item).hide();
      } else {
        $(item).show();
      }
    } else if (text == "I") {
      if (!/I/.test(t)) {
        $(item).hide();
      } else {
        $(item).show();
      }
    } else if (text == "Select Theme") {
      changeColorText("Please select a T-shirt theme:");
    }
  });
}

let total1 = 0;
$(activity).each(function(index, item) {
  const c = $(item).find("input")[0];

  $(c).change(function() {
    const text = $(item).text();
    let f = text.indexOf("Workshop");
    let l = text.indexOf(",");
    let s = text.substring(f, l);
    let str = s.replace(/\s/g, "");

    console.log(s + " " + index);
    var numberPattern = /\d+/g;
    const total = text.match(numberPattern);

    if ($(item).find("input")[0].checked) {
      disableCheckbox(str, index);
      total1 = total1 + Number(total[total.length - 1]);
      hideSpan.show();
      $(hideSpan).text(`Total: $${total1}`);
    } else {
      enableCheckbox(str, index);
      total1 = total1 - Number(total[total.length - 1]);
      hideSpan.show();
      $(hideSpan).text(`Total: $${total1}`);
    }
  });
});
function compareText(text, index) {
  let f = text.indexOf("Workshop");
  let l = text.indexOf(",");
  let s = text.substring(f, l);
  let str = s.replace(/\s/g, "");
  disableCheckbox(str, index);
  console.log(s + " " + index);
  var numberPattern = /\d+/g;
  const total = text.match(numberPattern);
  total1 = total1 + Number(total[total.length - 1]);
  hideSpan.show();
  $(hideSpan).text(`Total: $${total1}`);
  console.log(total1);
}

function disableCheckbox(s, i) {
  $(activity).each(function(index, item) {
    const c = $(item).find("input")[0];
    const text = $(item).text();

    let f = text.indexOf("Workshop");
    let l = text.indexOf(",");
    let sl = text.substring(f, l);
    let str = sl.replace(/\s/g, "");
    if (i !== index) {
      if (s === str) {
        $(this).css({ color: "#D3D3D3" });
        $(c).attr("disabled", true);
      }
    }
  });
}
function enableCheckbox(s, i) {
  $(activity).each(function(index, item) {
    const c = $(item).find("input")[0];
    const text = $(item).text();

    let f = text.indexOf("Workshop");
    let l = text.indexOf(",");
    let sl = text.substring(f, l);
    let str = sl.replace(/\s/g, "");
    if (i !== index) {
      if (s === str) {
        $(this).css({ color: "#00000" });
        $(c).attr("disabled", false);
      }
    }
  });
}
//The "Credit Card" payment option should be selected by default.
$(payment).each(function() {
  if ($(this).val() == "credit card") {
    $(this).attr("selected", "selected");
    $("#paypal").hide();
    $("#bitcoin").hide();
  }
});
//Display payment sections based on the payment option chosen in the select menu. And remaining are hide except selected option
let paymentOption = "credit card";

$("#payment").change(function() {
  var $option = $(this).find("option:selected");
  paymentOption = $option.val();
  if (paymentOption == "credit card") {
    $("#paypal").hide();
    $("#bitcoin").hide();
    $("#credit-card").show();
  } else if (paymentOption == "paypal") {
    $("#credit-card").hide();
    $("#bitcoin").hide();
    $("#paypal").show();
  } else if (paymentOption == "bitcoin") {
    $("#paypal").hide();
    $("#credit-card").hide();
    $("#bitcoin").show();
  } else if (paymentOption == "select_method") {
    $("#paypal").hide();
    $("#bitcoin").hide();
    $("#credit-card").show();
  }
});
// Get the  information from credit card input fields.
let creditCardNo = " ";
let zipNo = " ";
let cvvNo = " ";
$("#cc-num").on("input", function() {
  creditCardNo = $(this).val();
});
$("#zip").on("input", function() {
  zipNo = $(this).val();
});
$("#cvv").on("input", function() {
  cvvNo = $(this).val();
});

// Credit Card  Information validation like Credit Card number, a Zip Code, and a 3 number CVV value.
function paymentValidation() {
  let ccn = $("#cc-num");
  let zip = $("#zip");
  let cvv = $("#cvv");

  if (paymentOption == "select_method") {
    ccn.prev().css({ color: "red" });
    zip.prev().css({ color: "red" });
    cvv.prev().css({ color: "red" });
    return false;
  } else if (paymentOption == "credit card") {
    let CRDV = true;
    let ZIP = true;
    let CVV = true;
    ccn.prev().css({ color: "black" });
    zip.prev().css({ color: "black" });
    cvv.prev().css({ color: "black" });

    if (!creditCardNo || !/\b\d{13,16}\b/.test(creditCardNo)) {
      ccn.css({ border: "2px solid red" });
      CRDV = false;
    } else {
      ccn.css({ border: "2px solid #c1deeb" });
      CRDV = true;
    }
    if (!zipNo || !/^(\d{5})$/.test(zipNo)) {
      zip.css({ border: "2px solid red" });
      ZIP = false;
    } else {
      zip.css({ border: "2px solid #c1deeb" });
      ZIP = true;
    }
    if (!cvvNo || !/^(\d{3})$/.test(cvvNo)) {
      cvv.css({ border: "2px solid red" });
      CVV = false;
    } else {
      cvv.css({ border: "2px solid #c1deeb" });
      CVV = true;
    }
    return CRDV && ZIP && CVV;
  }
  return true;
}
// validate User Name.
var inputName = $(name);
var is_name = " ";
var uName = false;

$(name).on("input", function() {
  inputName = $(this);
  is_name = inputName.val();
  uName = isValidUsername(is_name);
  validator(is_name, uName, inputName);
});

function isValidUsername(username) {
  return username;
}
// Validate emailID.
var inputEmail = $("#mail");
var is_email = " ";
var email = false;

$("#mail").on("input", function() {
  inputEmail = $(this);
  is_email = inputEmail.val();
  email = isValidEmail(is_email);
  validator(is_email, email, inputEmail);
});

function isValidEmail(email) {
  return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}
function validator(text, isValid, input) {
  if (text && isValid && input) {
    input.removeClass("invalid").addClass("valid");
  } else {
    input.removeClass("valid").addClass("invalid");
  }
}
//Validate a Register for Activities checkboxes (at least one must be selected)
function isChecked() {
  let ck_box = $('input[type="checkbox"]:checked').length;
  console.log(ck_box);
  if (ck_box > 0) {
    $(".activities legend").css({ color: "black" });
    return true;
  } else {
    $(".activities legend").css({ color: "red" });
    return false;
  }
}

function onSubmit() {
  let isValid = true;
  validator(is_name, uName, inputName);
  validator(is_email, email, inputEmail);
  isValid = isValid && uName;
  isValid = isValid && email;
  const isCheckedValid = isChecked();
  isValid = isValid && isCheckedValid;
  const isPaymentValid = paymentValidation();
  isValid = isValid && isPaymentValid;
  return isValid;
}
