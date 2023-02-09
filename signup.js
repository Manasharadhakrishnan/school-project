$(document).ready(function () {
  $("#signupForm").validate({
    rules: {
      username: {
        required: true,
        minlength: 5
      },
      password: {
        required: true,
        minlength: 8
      },
      confirmpassword: {
        required: true,
        minlength: 8,
        equalTo: "#password"
      }

    },
    messages: {
      username: {
        required: "Please enter a username",
        minlength: "Your username must be at least 5 characters long"
      },

      password: {
        required: "Please enter a password",
        minlength: "Password must be at least 8 characters long"
      },
      confirmpassword: {
        required: "Please confirm your password",
        minlength: "Password must be at least 8 characters long",
        equalTo: "Passwords do not match"
      }

    }
  });

  $("#signupForm").submit(function (event) {
    if ($("#signupForm").valid()) {
      event.preventDefault();
      redirectToLogin();
    }
  });
});

function redirectToLogin() {
  window.location.replace("http://127.0.0.1:5500/login%20.html?");
}
