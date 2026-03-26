// Auth guard
if (!localStorage.getItem("currentUser")) {
  window.location.href = "loginpage.html";
}

let currentUser = localStorage.getItem("currentUser");

function getPostId() {
  let params = new URLSearchParams(window.location.search);
  return parseInt(params.get("id"));
}

function getPosts() {
  return JSON.parse(localStorage.getItem("posts")) || [];
}

function savePosts(posts) {
  localStorage.setItem("posts", JSON.stringify(posts));
}

function getMediaHTML(media) {
  if (!media) return "";
  if (media.startsWith("data:image")) {
    return `<img src="${media}" style="max-width:100%; margin-top:8px; border-radius:8px;">`;
  } else if (media.startsWith("data:video")) {
    return `<video controls style="max-width:100%; margin-top:8px; border-radius:8px;">
              <source src="${media}">
            </video>`;
  }
  return "";
}

function renderPost() {
  let id = getPostId();
  let posts = getPosts();
  let post = posts.find(function(p) { return p.id === id; });
  let container = document.getElementById("postContainer");

  if (!post) {
    container.innerHTML = '<p class="msg">Post not found.</p>';
    return;
  }

  let liked = post.likes.includes(currentUser);
  let heart = liked ? "❤️" : "🤍";

  let commentsHTML = "";
  if (post.comments.length === 0) {
    commentsHTML = '<p class="msg">No comments yet. Be the first!</p>';
  } else {
    post.comments.forEach(function(c) {
      commentsHTML += `
        <div class="commentItem">
          <strong>${c.user}:</strong> ${c.text}
        </div>`;
    });
  }

  container.innerHTML = `
    <div class="postFull">
      <div class="postAuthor">${post.user}</div>
      <div class="postTime">${post.time}</div>
      <div class="postBody">
        ${post.content}
        ${getMediaHTML(post.media)}
      </div>
      <div class="postActions">
        <button class="secBtn" onclick="likePost(${post.id})">${heart} ${post.likes.length}</button>
      </div>
      <div class="commentsSection">
        <h3>Comments (${post.comments.length})</h3>
        ${commentsHTML}
        <div class="addCommentBox">
          <input type="text" id="commentInput" placeholder="Write a comment...">
          <button class="mainBtn" onclick="addComment(${post.id})">Post</button>
        </div>
      </div>
    </div>
  `;

  // Enter key to submit comment
  document.getElementById("commentInput").addEventListener("keydown", function(e) {
    if (e.key === "Enter") addComment(getPostId());
  });
}

function likePost(id) {
  let posts = getPosts();
  posts = posts.map(function(p) {
    if (p.id === id) {
      if (p.likes.includes(currentUser)) {
        p.likes = p.likes.filter(function(u) { return u !== currentUser; });
      } else {
        p.likes.push(currentUser);
      }
    }
    return p;
  });
  savePosts(posts);
  renderPost();
}

function addComment(id) {
  let input = document.getElementById("commentInput");
  let text = input.value.trim();
  if (text === "") {
    alert("Comment cannot be empty.");
    return;
  }

  let posts = getPosts();
  posts = posts.map(function(p) {
    if (p.id === id) {
      p.comments.push({ user: currentUser, text: text });
    }
    return p;
  });
  savePosts(posts);
  input.value = "";
  renderPost();
}

renderPost();