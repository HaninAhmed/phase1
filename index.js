// Auth guard
if (!localStorage.getItem("currentUser")) {
  window.location.href = "loginpage.html";
}

let currentUser = localStorage.getItem("currentUser");
document.getElementById("userName").textContent = currentUser;

let users = JSON.parse(localStorage.getItem("users")) || [];
let user = users.find(function(u) { return u.username === currentUser; });
if (user && user.photo) {
  document.getElementById("userPhoto").src = user.photo;
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "loginpage.html";
}