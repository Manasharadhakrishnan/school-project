// $(document).ready(function() {
//     $("#student-form-dropdown").click(function() {
//       $("#student-form").show();
//     });
//   });
  $("#navbarNav").submit(function(event) {
    if ($("#navbarNav").valid()) {
      event.preventDefault();
      redirectToLogin();
    }
  });

function redirectToLogin() {
  window.location.replace("http://127.0.0.1:5500/student%20form.html");
}
document.querySelectorAll('.dropdown-toggle').forEach(item => {
  item.addEventListener('click', event => {
 
    if(event.target.classList.contains('dropdown-toggle') ){
      event.target.classList.toggle('toggle-change');
    }
    else if(event.target.parentElement.classList.contains('dropdown-toggle')){
      event.target.parentElement.classList.toggle('toggle-change');
    }
  })
});
