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

function isFollowing(username) {
  let users = getUsers();

  let currentuserObj = users.find(function(user) {
    return user.username === currentUser;
  });

  if (!currentuserObj || !currentuserObj.following) return false;
  return currentuserObj.following.includes(username);
}

function loadFollowing() {
  let users = getUsers();

  let container = document.getElementById("followingList");

  if (!container) return;

  container.innerHTML = "";

  users.forEach(user => {
    if (user.username === currentUser) return;

    let btnText = isFollowing(user.username) ? "Unfollow" : "Follow";

    let card = document.createElement("div");
    card.className = "followLine";

    card.innerHTML = `
      <div class="followingInfo">
        <img class="followingPhoto" src="${user.photo || 'images/default-photo.jpg'}" alt="${user.username}">
        <h3>${user.username}</h3>
      </div>
      <button class="mainBtn" onclick="followUnfollow('${user.username}')">${btnText}</button>
    `;
    
    container.appendChild(card);
  });
}

function followUnfollow(followUsername) {
  let users = getUsers();

  if (!currentUser) return;

  let userIndex = users.findIndex(user => user.username === currentUser);

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
  loadFollowing();
}

document.addEventListener("DOMContentLoaded", function() {
  loadFollowing();
});
