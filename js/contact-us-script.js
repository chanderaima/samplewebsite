const form = document.getElementById("contact-us-form");

$('#submitBtn').on("click", (e) => {
  e.preventDefault();
  var firstName = $("#firstName").val();
  var email = $("#email").val();
  var message = $("#message").val();
  var phone = $("#phone").val();
  var company = $("#company").val() || '';
  
  if (firstName == "") {
    $("span.name_error").show();
  }
  if (!validPhoneNumber(phone)) {
    $("span.phone_error").show();
  }
  if (!validateEmail(email)) {
    $("span.email_error").show();
  }
  // if (company == "") {
  //   $("span.company_error").show();
  // }
  if (message == "") {
    $("span.message_error").show();
  }

  if (
    firstName == "" ||
    !validateEmail(email) ||
    !validPhoneNumber(phone) ||
    message == ""
  ) {
    $(".form_error").show();
  } else {
    $(".error-message").hide();

    /*setTimeout(function () {
      $(".successful-message").hide();
    }, 3000);*/
    apiFunction(firstName, email, phone, company, message);
  }
  // setTimeout(function () {
  //   $("#popup-message").addClass("d-flex");
  // }, 5000);

  setTimeout(function () {
    $("#popup-message").removeClass("d-flex d-none");
  }, 5000);

  $('#close-popup').click(function(){
    $('#popup-message').addClass('d-none');
    setTimeout(function () {
         $("#popup-message").removeClass("d-flex d-none");
       }, 400);
  })
});

function touchField(field) {
  if (field == "firstName") {
    $("span.name_error").hide();
  }
  if (field == "company") {
    $("span.company_error").hide();
  }
  if (field == "message") {
    $("span.message_error").hide();
  }
  if (field == "phone") {
    $("span.phone_error").hide();
  }
  if (field == "email") {
    $("span.email_error").hide();
  }
}

function apiFunction(firstName, email,phone, company, message) {
  $(".spinner-border").show();
 // $(".container").css("background-color", "#3F48BF");

  var emailRecipients = {
    firstName: firstName,
    email: email,
    mobile: phone,
    company: company,
    custom1: message,
    listId: 982,
    segmentId: 1617
  }

  if (firstName == "") {
    $(".success-message").fadeOut(200).hide();
    $(".error").fadeOut(200).show();
  } else {
    $.ajax({
      type: "POST",
      url: "https://api.yavun.com/api/1477/userDataWC",
      data: emailRecipients,
      success: function (res) {
        $(".spinner-border").hide();
        $(".success-message").addClass('d-flex');
        // $(".container").css("background-color", "#8cd1ff");
        console.log(res);
        form.reset();
      },
      error: function () {
        $(".error-message").show();
        $(".spinner-border").hide();
      },
    });
  }
}

var validateEmail = function (email) {
  var regEx =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return (
    email !== "" && email !== null && email !== undefined && regEx.test(email)
  );
};

const numInputs = document.querySelectorAll('input[type=number]')

numInputs.forEach(function(input) {
  input.addEventListener('change', function(e) {
    if (e.target.value == '') {
      e.target.value = 0
    }
  })
})

var validPhoneNumber = function (phone) {
  var phoneNo = /^\d{10}$/;
  if(phone !== "" && phone !== null && phone !== undefined){
    return phoneNo.test(phone);
  }else{
    return true;
  }
  // return (
  //   phone !== "" && phone !== null && phone !== undefined && phoneNo.test(phone)
  // );
};


// Refresh URL
function modifyStateUrl() {
  var url = window.location.toString();
  console.log(url);
  if(url.indexOf('#') > 0) {
    var clearUrl = url.substring(0, url.indexOf('#'));
    console.log(clearUrl);
    window.location = clearUrl;
  }
}