// Auth guard
if (!sessionStorage.getItem("currentUser")) {
  window.location.href = "loginpage.html";
}

let currentUser = sessionStorage.getItem("currentUser");
let currentUserId = sessionStorage.getItem("currentUserId");

if (document.getElementById("userName")) {
  document.getElementById("userName").textContent = currentUser;
}

function logout() {
  sessionStorage.removeItem("currentUser");
  sessionStorage.removeItem("currentUserId");
  window.location.href = "loginpage.html";
}