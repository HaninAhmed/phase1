// Redirect if already logged in
if (localStorage.getItem("currentUser")) {
  window.location.href = "index.html";
}

document.addEventListener("keydown", function(e) {
  if (e.key === "Enter") handleRegister();
});

function showError(msg) {
  let err = document.getElementById("errorMsg");
  let suc = document.getElementById("successMsg");
  suc.style.display = "none";
  err.textContent = msg;
  err.style.display = "block";
}

function showSuccess(msg) {
  let err = document.getElementById("errorMsg");
  let suc = document.getElementById("successMsg");
  err.style.display = "none";
  suc.textContent = msg;
  suc.style.display = "block";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function handleRegister() {
  let username = document.getElementById("regUsername").value.trim();
  let email = document.getElementById("regEmail").value.trim();
  let password = document.getElementById("regPassword").value;
  let confirm = document.getElementById("regConfirm").value;

  if (username === "" || email === "" || password === "" || confirm === "") {
    showError("Please fill in all fields.");
    return;
  }

  if (username.length < 3) {
    showError("Username must be at least 3 characters.");
    return;
  }

  if (!isValidEmail(email)) {
    showError("Please enter a valid email address.");
    return;
  }

  if (password.length < 6) {
    showError("Password must be at least 6 characters.");
    return;
  }

  if (password !== confirm) {
    showError("Passwords do not match.");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let usernameTaken = users.some(function(u) {
    return u.username.toLowerCase() === username.toLowerCase();
  });
  if (usernameTaken) {
    showError("That username is already taken.");
    return;
  }

  let emailTaken = users.some(function(u) {
    return u.email.toLowerCase() === email.toLowerCase();
  });
  if (emailTaken) {
    showError("An account with that email already exists.");
    return;
  }

  let newUser = {
    username: username,
    email: email,
    password: password,
    bio: "",
    photo: "",
    followers: [],
    following: []
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  showSuccess("Account created! Redirecting to login...");

  setTimeout(function() {
    window.location.href = "loginpage.html";
  }, 1500);
}