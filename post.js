// Auth guard
if (!sessionStorage.getItem("currentUser")) {
  window.location.href = "loginpage.html";
}

let currentUser = sessionStorage.getItem("currentUser");
let currentUserId = sessionStorage.getItem("currentUserId");

function getPostId() {
  let params = new URLSearchParams(window.location.search);
  return params.get("id");
}



async function renderPost() {
  let id = getPostId();
  let container = document.getElementById("postContainer");

  if (!id) {
    container.innerHTML = '<p class="msg">No post ID provided.</p>';
    return;
  }

  container.innerHTML = "<p>Loading...</p>";

  try {
    const res = await fetch(`/api/posts/${id}`);

    if (!res.ok) {
      container.innerHTML = '<p class="msg">Post not found.</p>';
      return;
    }

    const post = await res.json();
    let liked = post.likes.some((l) => l.userId === parseInt(currentUserId));
    let heart = liked ? "❤️" : "🤍";

    let mediaHTML = "";
    if (post.media) {
      if (post.media.startsWith("data:image")) {
        mediaHTML = `<img src="${post.media}" style="max-width:100%; margin-top:8px; border-radius:8px;">`;
      } else if (post.media.startsWith("data:video")) {
        mediaHTML = `<video controls style="max-width:100%; margin-top:8px; border-radius:8px;"><source src="${post.media}"></video>`;
      }
    }

    let commentsHTML =
      post.comments.length === 0
        ? '<p class="msg">No comments yet. Be the first!</p>'
        : post.comments
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

    container.innerHTML = `
      <div class="postFull">
        <div class="postAuthor">@${post.user.username}</div>
        <div class="postTime">${post.time}</div>
        <div class="postBody">${post.content}${mediaHTML}</div>
        <div class="postActions">
          <button class="secBtn likeBtn" onclick="likePost(${post.id}, this)">
            ${heart} <span class="likeCount">${post._count.likes}</span>
          </button>
        </div>
        <div class="commentsSection">
          <h3>Comments (${post.comments.length})</h3>
          <div class="commentsList">${commentsHTML}</div>
          <div class="addCommentBox">
            <input type="text" id="commentInput" placeholder="Write a comment...">
            <button class="mainBtn" onclick="addComment(${post.id})">Post</button>
          </div>
        </div>
      </div>
    `;

    document.getElementById("commentInput").addEventListener("keydown", function (e) {
      if (e.key === "Enter") addComment(post.id);
    });
  } catch (err) {
    container.innerHTML = '<p class="msg">Failed to load post.</p>';
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

async function addComment(postId) {
  let input = document.getElementById("commentInput");
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
    let commentsList = document.querySelector(".commentsList");
    let div = document.createElement("div");
    div.innerHTML = `
      <span><strong>${comment.user.username}:</strong> ${comment.text}</span>
      <button class="deletebtn" onclick="deleteComment(${comment.id}, this)">Delete</button>
    `;
    commentsList.appendChild(div);
    input.value = "";

    // Update comment count in heading
    let h3 = document.querySelector(".commentsSection h3");
    if (h3) {
      let count = commentsList.children.length;
      h3.textContent = `Comments (${count})`;
    }
  } catch (err) {
    alert("Failed to add comment.");
  }
}

async function deleteComment(commentId, btn) {
  try {
    await fetch("/api/comments", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ commentId }),
    });
    btn.closest("div").remove();
  } catch (err) {
    alert("Failed to delete comment.");
  }
}


renderPost();