$('#submitCareer').on("click", (e) => {
  e.preventDefault();
  var firstName = $("#firstName").val();
  var email = $("#email").val();
  var phone = $('#phone').val();
  var files = $('#file').val().toLowerCase();
  var flag = true;


  if (firstName == "") {
    $("span.fname_error").show();
    flag = false;
  }
  
  if (!validPhoneNumber(phone)) {
    $("span.phone_error").show();
    flag = false;
  }
  if (!validateEmail(email)) {
    $("span.email_error").show();
    flag = false;
  }
  if(!validFile(files)){
    $("span.file_error").show();
    flag = false;
  }

  if(flag){
    apiFunction(firstName, email, phone);
  }
});

function touchField(field) {
  if (field == "firstName") {
    $("span.fname_error").hide();
  }
  
  if (field == "phone") {
    $("span.phone_error").hide();
  }
  if (field == "email") {
    $("span.email_error").hide();
  }
  if (field == "email") {
    $("span.file_error").hide();
  }
}

function apiFunction(firstName, email, phone) {
  $(".spinner-border").show();
 // $(".container").css("background-color", "#3F48BF");

  var emailRecipients = {
    firstName: firstName,
    email: email,
    mobile: phone,
    listId: 982,
    segmentId: 1617
  }
    var formData = new FormData();
    var files = $('#file')[0].files;
    if(files && files != null && files.length > 0){
      formData.append('file', files[0]);
    }

    $.each(emailRecipients, function(name, value){
      formData.append(name, value);  
    });
    //formData.append('file', $('#file')[0].files);
    console.log(...formData);
    
    $.ajax({
      type: "POST",
      url: "http://api.yavun.com/api/1/carierData",//http://api.yavun.com/api/1482/carierData
      data: formData,
      processData: false,
      contentType: false,
      success: function (res) {
        $(".alert-success").show();
        // $(".container").css("background-color", "#8cd1ff");
        console.log(res);
        $("#firstName").val("");
        $("#email").val("");
        $('#phone').val("");
        $('#file').val("");
        
      },
      error: function () {
        $(".alert-danger").show();
      },
    });
}

var validateEmail = function (email) {
  var regEx =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return (
    email !== "" && email !== null && email !== undefined && regEx.test(email)
  );
};

var validPhoneNumber = function (phone) {
    var phoneNo = /^\d{10}$/;
    return (
      phone !== "" && phone !== null && phone !== undefined && phoneNo.test(phone)
    );
};

var validFile = function(files){
  var regex = new RegExp("(.*?)\.(pdf|docx|doc)$");
  return files && files != null && files.length > 0 && regex.test(files)
}