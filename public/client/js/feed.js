// Auth guard
if (!sessionStorage.getItem("currentUser")) {
  window.location.href = "loginpage.html";
}

let currentUser = sessionStorage.getItem("currentUser");
let currentUserId = sessionStorage.getItem("currentUserId");



async function loadFeed() {
  let feed = document.getElementById("homeFeed");
  if (!feed) return;

  feed.innerHTML = "<p>Loading...</p>";

  try {
    const res = await fetch(`/api/posts?userId=${currentUserId}`);
    if (!res.ok) throw new Error("Failed to load feed");
    const posts = await res.json();
    feed.innerHTML = "";
    if (posts.length === 0) {
      feed.innerHTML = "<p>No posts yet. Follow some users!</p>";
      return;
    }
    posts.forEach((post) => feed.appendChild(buildPostCard(post)));
  } catch (err) {
    feed.innerHTML = "<p>Failed to load feed. Please try again.</p>";
  }
}

async function loadMyPosts() {
  let feed = document.getElementById("mypostFeed");
  if (!feed) return;

  feed.innerHTML = "<p>Loading...</p>";

  try {
    const res = await fetch(`/api/users/${currentUser}`);
    if (!res.ok) throw new Error();
    const data = await res.json();
    feed.innerHTML = "";
    if (!data.posts || data.posts.length === 0) {
      feed.innerHTML = "<p>You have not posted yet.</p>";
      return;
    }
    data.posts.forEach((post) => {
      
      let div = document.createElement("div");
      div.classList.add("post");
      div.innerHTML = `
        <h4>@${currentUser}</h4>
        <p>${post.content}</p>
        <small>${post.time}</small>
        <br><br>
        <div class="postActionsRow">
          <span>❤️ ${post._count.likes}  💬 ${post._count.comments}</span>
          <button onclick="viewPost(${post.id})">View</button>
          <button onclick="deletePost(${post.id}, this)">Delete</button>
        </div>
      `;
      feed.appendChild(div);
    });
  } catch (err) {
    feed.innerHTML = "<p>Failed to load your posts.</p>";
  }
}

function buildPostCard(post) {
  let liked = post.likes.some((l) => l.userId === parseInt(currentUserId));
  let heart = liked ? "❤️" : "🤍";
  let likesCount = post._count.likes;

  let mediaHTML = "";
  if (post.media) {
    if (post.media.startsWith("data:image")) {
      mediaHTML = `<img src="${post.media}" style="max-width:100%; margin-top:8px; border-radius:8px;">`;
    } else if (post.media.startsWith("data:video")) {
      mediaHTML = `<video controls style="max-width:100%; margin-top:8px; border-radius:8px;"><source src="${post.media}"></video>`;
    }
  }

  let commentsHTML = post.comments
    .map(
      (c) => `
    <div>
      <span><strong>${c.user.username}:</strong> ${c.text}</span>
      ${c.user.username === currentUser
        ? `<button class="deletebtn" onclick="deleteComment(${c.id}, this)">Delete</button>`
        : ""}
    </div>`
    )
    .join("");

  let div = document.createElement("div");
  div.classList.add("post");
  div.setAttribute("data-post-id", post.id);
  div.innerHTML = `
    <h4>@${post.user.username}</h4>
    <p>${post.content}</p>
    ${mediaHTML}
    <small>${post.time}</small>
    <br><br>
    <div class="postActionsRow">
      <button class="likeBtn" onclick="likePost(${post.id}, this)">${heart} <span class="likeCount">${likesCount}</span></button>
      <button onclick="toggleCommentBox(${post.id})">💬 Comment</button>
      <button onclick="viewPost(${post.id})">View</button>
      ${post.user.username === currentUser ? `<button onclick="deletePost(${post.id}, this)">Delete</button>` : ""}
    </div>
    <div id="commentBox-${post.id}" style="display:none; margin-top:8px;">
      <input type="text" id="commentInput-${post.id}" placeholder="Write a comment..." style="width:70%;">
      <button onclick="addComment(${post.id})">Post</button>
    </div>
    <div id="comments-${post.id}" style="margin-top:8px;">${commentsHTML}</div>
  `;
  return div;
}



async function createPost() {
  let content = document.getElementById("postContent").value.trim();
  let mediaInput = document.getElementById("postMedia");
  let file = mediaInput ? mediaInput.files[0] : null;

  if (!content && !file) {
    alert("Post cannot be empty.");
    return;
  }

  let media = null;
  if (file) {
    media = await readFileAsDataURL(file);
  }

  try {
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, userId: currentUserId, media }),
    });

    if (!res.ok) throw new Error();

    document.getElementById("postContent").value = "";
    if (mediaInput) mediaInput.value = "";

    if (document.getElementById("homeFeed")) loadFeed();
    if (document.getElementById("mypostFeed")) loadMyPosts();
  } catch (err) {
    alert("Failed to create post. Please try again.");
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



async function deletePost(id, btn) {
  try {
    const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error();
    // Remove card from DOM
    let card = btn ? btn.closest(".post") : null;
    if (card) card.remove();
  } catch (err) {
    alert("Failed to delete post.");
  }
}



async function likePost(postId, btn) {
  try {
    const res = await fetch("/api/likes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: currentUserId, postId }),
    });
    const data = await res.json();
    let countSpan = btn.querySelector(".likeCount");
    let count = parseInt(countSpan.textContent);
    btn.innerHTML = data.liked
      ? `❤️ <span class="likeCount">${count + 1}</span>`
      : `🤍 <span class="likeCount">${count - 1}</span>`;
  } catch (err) {
    alert("Failed to update like.");
  }
}



function toggleCommentBox(id) {
  let box = document.getElementById(`commentBox-${id}`);
  box.style.display = box.style.display === "none" ? "block" : "none";
}

async function addComment(postId) {
  let input = document.getElementById(`commentInput-${postId}`);
  let text = input.value.trim();

  if (!text) {
    alert("Comment cannot be empty.");
    return;
  }

  try {
    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, userId: currentUserId, postId }),
    });
    const comment = await res.json();

    let commentsList = document.getElementById(`comments-${postId}`);
    let div = document.createElement("div");
    div.innerHTML = `
      <span><strong>${comment.user.username}:</strong> ${comment.text}</span>
      <button class="deletebtn" onclick="deleteComment(${comment.id}, this)">Delete</button>
    `;
    commentsList.appendChild(div);
    input.value = "";
  } catch (err) {
    alert("Failed to add comment.");
  }
}

async function deleteComment(commentId, btn) {
  try {
    await fetch(`/api/comments?id=${commentId}`, { method: "DELETE" });
    btn.closest("div").remove();
  } catch (err) {
    alert("Failed to delete comment.");
  }
}



function viewPost(id) {
  window.location.href = "post.html?id=" + id;
}



function logout() {
  sessionStorage.removeItem("currentUser");
  sessionStorage.removeItem("currentUserId");
  window.location.href = "loginpage.html";
}



async function loadFollowing() {
  let container = document.getElementById("followingList");
  if (!container) return;

  container.innerHTML = "<p>Loading users...</p>";

  try {
   
    const res = await fetch("/api/statistics");
    const stats = await res.json();

    container.innerHTML = "";

    const displayUsers = stats.top3ActiveUsers || [];
    if (displayUsers.length === 0) {
      container.innerHTML = "<p>No users found.</p>";
      return;
    }

    for (let u of displayUsers) {
      if (u.username === currentUser) continue;

      const followRes = await fetch(
        `/api/follows?followerId=${currentUserId}&followingId=${u.id || 0}`
      );
      // fallback: just show follow button
      let card = document.createElement("div");
      card.className = "followLine";
      card.innerHTML = `
        <div class="followingInfo">
          <img class="followingPhoto" src="images/profilePhoto.png" alt="${u.username}">
          <h3>@${u.username}</h3>
        </div>
        <button class="mainBtn" onclick="goToProfile('${u.username}')">View Profile</button>
      `;
      container.appendChild(card);
    }
  } catch (err) {
    container.innerHTML = "<p>Failed to load users.</p>";
  }
}

function goToProfile(username) {
  window.location.href = `profile.html?user=${username}`;
}



if (document.getElementById("userName")) {
  document.getElementById("userName").textContent = currentUser;
}

document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("mypostFeed")) loadMyPosts();
  if (document.getElementById("homeFeed")) loadFeed();
  if (document.getElementById("followingList")) loadFollowing();
  if (document.getElementById("userName")) {
    document.getElementById("userName").textContent = currentUser;
  }
});