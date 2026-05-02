// Redirect if already logged in
if (sessionStorage.getItem("currentUser")) {
  window.location.href = "index.html";
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") handleLogin();
});

function showError(msg) {
  let el = document.getElementById("errorMsg");
  el.textContent = msg;
  el.style.display = "block";
}

async function handleLogin() {
  let email = document.getElementById("loginEmail").value.trim();
  let password = document.getElementById("loginPassword").value;

  if (email === "" || password === "") {
    showError("Please fill in all fields.");
    return;
  }

  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      showError(data.error || "Login failed.");
      return;
    }

    // Store the logged-in user in sessionStorage (survives page navigation, clears on tab close)
    sessionStorage.setItem("currentUser", data.username);
    sessionStorage.setItem("currentUserId", data.id);

    window.location.href = "index.html";
  } catch (err) {
    showError("Something went wrong. Please try again.");
  }
}