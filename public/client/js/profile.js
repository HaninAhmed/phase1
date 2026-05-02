// Auth guard
if (!sessionStorage.getItem("currentUser")) {
  window.location.href = "loginpage.html";
}

let currentUser = sessionStorage.getItem("currentUser");
let currentUserId = sessionStorage.getItem("currentUserId");

// Determine whose profile to show (own profile if no ?user= param)
function getProfileUsername() {
  let params = new URLSearchParams(window.location.search);
  return params.get("user") || currentUser;
}

document.addEventListener("DOMContentLoaded", function () {
  loadProfile();

  let editForm = document.getElementById("editProfile");
  if (editForm) {
    editForm.addEventListener("submit", saveProfileChanges);
  }
});

async function loadProfile() {
  let username = getProfileUsername();
  let isOwnProfile = username === currentUser;

  try {
    const res = await fetch(`/api/users/${username}`);
    if (!res.ok) {
      alert("User not found.");
      return;
    }

    const data = await res.json();

    // Fill in profile info
    let profileNameEl = document.querySelector(".userInfo h2");
    if (profileNameEl) profileNameEl.textContent = "@" + data.username;

    let bioEl = document.getElementById("userBio");
    if (bioEl) bioEl.textContent = data.bio || "No bio yet.";

    let followersEl = document.getElementById("followerCount");
    if (followersEl) followersEl.textContent = data._count.followers;

    let followingEl = document.getElementById("followingCount");
    if (followingEl) followingEl.textContent = data._count.following;

    let photoEl = document.getElementById("profilePhoto");
    if (photoEl && data.photo) photoEl.src = data.photo;

    // Pre-fill edit form if own profile
    if (isOwnProfile) {
      let editUsername = document.getElementById("editUsername");
      let editBio = document.getElementById("editBio");
      if (editUsername) editUsername.value = data.username || "";
      if (editBio) editBio.value = data.bio || "";
    }

    // Show/hide edit form and follow button
    let editSection = document.getElementById("editProfileSection");
    let followBtn = document.getElementById("followBtn");

    if (editSection) editSection.style.display = isOwnProfile ? "block" : "none";
    if (followBtn) {
      if (isOwnProfile) {
        followBtn.style.display = "none";
      } else {
        followBtn.style.display = "inline-block";
        // Check if already following
        const followRes = await fetch(
          `/api/follows?followerId=${currentUserId}&followingId=${data.id}`
        );
        const followData = await followRes.json();
        followBtn.textContent = followData.following ? "Unfollow" : "Follow";
        followBtn.onclick = () => toggleFollow(data.id, followBtn);
      }
    }

    // Load this user's posts
    loadUserPosts(data.posts || []);

  } catch (err) {
    alert("Failed to load profile.");
  }
}

function loadUserPosts(posts) {
  let container = document.getElementById("userPostsContainer");
  if (!container) return;

  container.innerHTML = "";

  if (!posts || posts.length === 0) {
    container.innerHTML = "<p>No posts yet.</p>";
    return;
  }

  posts.forEach((post) => {
    let div = document.createElement("div");
    div.classList.add("post");
    div.innerHTML = `
      <p>${post.content}</p>
      <small>${post.time}</small>
      <br>
      <span>❤️ ${post._count.likes}  💬 ${post._count.comments}</span>
      <button onclick="window.location.href='post.html?id=${post.id}'">View</button>
      ${getProfileUsername() === currentUser
        ? `<button onclick="deletePost(${post.id}, this)">Delete</button>`
        : ""}
    `;
    container.appendChild(div);
  });
}

async function deletePost(id, btn) {
  try {
    const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error();
    btn.closest(".post").remove();
  } catch (err) {
    alert("Failed to delete post.");
  }
}

async function toggleFollow(targetUserId, btn) {
  let following = btn.textContent.trim() === "Unfollow";

  try {
    const res = await fetch("/api/follows", {
      method: following ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        followerId: parseInt(currentUserId),
        followingId: targetUserId,
      }),
    });

    if (!res.ok) throw new Error();

    btn.textContent = following ? "Follow" : "Unfollow";

    // Update follower count on screen
    let followersEl = document.getElementById("followerCount");
    if (followersEl) {
      let count = parseInt(followersEl.textContent);
      followersEl.textContent = following ? count - 1 : count + 1;
    }
  } catch (err) {
    alert("Failed to update follow.");
  }
}

async function saveProfileChanges(e) {
  e.preventDefault();

  let newUsername = document.getElementById("editUsername").value.trim();
  let newBio = document.getElementById("editBio").value.trim();
  let photoInput = document.getElementById("editPhoto");
  let newPhoto = null;

  if (photoInput && photoInput.files[0]) {
    newPhoto = await readFileAsDataURL(photoInput.files[0]);
  }

  try {
    const res = await fetch(`/api/users/${currentUser}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: newUsername, bio: newBio, photo: newPhoto }),
    });

    if (!res.ok) throw new Error();

    // Update sessionStorage if username changed
    if (newUsername && newUsername !== currentUser) {
      sessionStorage.setItem("currentUser", newUsername);
      currentUser = newUsername;
    }

    alert("Profile updated!");
    loadProfile();
  } catch (err) {
    alert("Failed to save profile changes.");
  }
}

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = () => reject(new Error("File read failed"));
    reader.readAsDataURL(file);
  });
}

function logout() {
  sessionStorage.removeItem("currentUser");
  sessionStorage.removeItem("currentUserId");
  window.location.href = "loginpage.html";
}