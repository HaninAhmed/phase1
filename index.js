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

// folowing users
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

function saveCurrentUser(username) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

function isFollowing(username) {
  let currentUser = getCurrentUser();

  if (!currentUser || !currentUser.following) return false;
  return currentUser.following.includes(username);
}

function loadFollowing() {
  let users = getUsers();
  let currentUser = getCurrentUser();

  let container = document.getElementById("followingList");

  if (!container || !currentUser) return;

  container.innerHTML = "";

  users.forEach(user => {
    if (user.username === currentUser.username) return;

    let btnText = isFollowing(user.username) ? "Unfollow" : "Follow";

    let card = document.createElement("div");
    card.className = "followingCard";

    card.innerHTML = `
      <div class="followingInfo">
        <img class="followingPhoto" src="${user.photo || 'images/default-photo.jpg'}" alt="${user.username}">
        <h3>${user.username}</h3>
      </div>
      <button class="mainbtn" onclick="followUnfollow('${user.username}')">${btnText}</button>
    `;
    
    container.appendChild(card);
  });
}

function followUnfollow(followUsername) {
  let users = getUsers();
  let currentUser = getCurrentUser();

  if (!currentUser) return;

  let userIndex = users.findIndex(user => user.username === currentUser.username);

  if (userIndex === -1) return;

  if (!users[userIndex].following) {
    users[userIndex].following = [];
  }

  let isFollowing = users[userIndex].following.includes(followUsername);

  if (isFollowing) {
    users[userIndex].following = users[userIndex].following.filter(username => username !== followUsername);
  } else {
    users[userIndex].following.push(followUsername);
  }

  saveUsers(users);
  saveCurrentUser(users[userIndex]);
  loadFollowing();
}

document.addEventListener("DOMContentLoaded", function() {
  loadFollowing();
});
