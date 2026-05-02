// Redirect if already logged in
if (sessionStorage.getItem("currentUser")) {
  window.location.href = "index.html";
}

document.addEventListener("keydown", function (e) {
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

async function handleRegister() {
  let username = document.getElementById("regUsername").value.trim();
  let email = document.getElementById("regEmail").value.trim();
  let password = document.getElementById("regPassword").value;
  let confirm = document.getElementById("regConfirm").value;

  if (!username || !email || !password || !confirm) {
    showError("Please fill in all fields.");
    return;
  }

  if (!isValidEmail(email)) {
    showError("Please enter a valid email address.");
    return;
  }

  if (password !== confirm) {
    showError("Passwords do not match.");
    return;
  }

  try {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      showError(data.error || "Registration failed.");
      return;
    }

    showSuccess("Account created! Redirecting to login...");
    setTimeout(() => {
      window.location.href = "loginpage.html";
    }, 1500);
  } catch (err) {
    showError("Something went wrong. Please try again.");
  }
}