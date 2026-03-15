// Load posts when the page opens
document.addEventListener("DOMContentLoaded", loadFeed);

// Show all posts in the feed
function loadFeed() {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  let feed = document.getElementById("feed");

  feed.innerHTML = "";

  posts.forEach(function(post) {
    let postDiv = document.createElement("div");
    postDiv.classList.add("post");

    postDiv.innerHTML = `
      <h4>${post.user}</h4>
      <p>${post.content}</p>
      <small>${post.time}</small>
      <br><br>
      <button onclick="viewPost(${post.id})">View</button>
      <button onclick="deletePost(${post.id})">Delete</button>
    `;

    feed.appendChild(postDiv);
  });
}

// Create a new post
function createPost() {
  let content = document.getElementById("postContent").value;

  if (content.trim() === "") {
    alert("Post cannot be empty");
    return;
  }

  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  let currentUser = localStorage.getItem("currentUser") || "User";

  let newPost = {
    id: Date.now(),
    user: currentUser,
    content: content,
    time: new Date().toLocaleString(),
    likes: [],
    comments: []
  };

  posts.push(newPost);
  localStorage.setItem("posts", JSON.stringify(posts));

  document.getElementById("postContent").value = "";

  loadFeed();
}

// Delete a post
function deletePost(id) {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  posts = posts.filter(function(post) {
    return post.id !== id;
  });

  localStorage.setItem("posts", JSON.stringify(posts));

  loadFeed();
}

// View a single post
function viewPost(id) {
  window.location.href = "post.html?id=" + id;
}

// Logout function
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}