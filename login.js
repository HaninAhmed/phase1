// Redirect if already logged in
if (localStorage.getItem("currentUser")) {
  window.location.href = "index.html";
}

document.addEventListener("keydown", function(e) {
  if (e.key === "Enter") handleLogin();
});

function showError(msg) {
  let el = document.getElementById("errorMsg");
  el.textContent = msg;
  el.style.display = "block";
}

function handleLogin() {
  let email = document.getElementById("loginEmail").value.trim();
  let password = document.getElementById("loginPassword").value;

  if (email === "" || password === "") {
    showError("Please fill in all fields.");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let user = users.find(function(u) {
    return u.email === email && u.password === password;
  });

  if (!user) {
    showError("Incorrect email or password.");
    return;
  }

  localStorage.setItem("currentUser", user.username);
  window.location.href = "index.html";
}