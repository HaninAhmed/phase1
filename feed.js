if (!localStorage.getItem("currentUser")) {
  window.location.href = "loginpage.html";
}

let currentUser = localStorage.getItem("currentUser");


// Load posts when the page opens
document.addEventListener("DOMContentLoaded", loadFeed);

function getFollowingUsers() {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let currentUserObj = users.find(u => u.username === currentUser);
  if (!currentUserObj || !currentUserObj.following) return [];
  return currentUserObj.following;
}


// Show my own posts in the feed and folling post
function loadFeed() {
  let allPosts = JSON.parse(localStorage.getItem("posts")) || [];
  let following = getFollowingUsers();
  following.push(currentUser); 
  let posts = allPosts.filter(post => following.includes(post.user));
  let feed = document.getElementById("feed");

  feed.innerHTML = "";

  posts.forEach(function(post) {
    let postDiv = document.createElement("div");
    postDiv.classList.add("post");



    let currentUser = localStorage.getItem("currentUser") || "User";
    let liked = post.likes.includes(currentUser);
    let heart = liked ? "❤️" : "🤍";
    // Count of likes
    let likesCount = post.likes.length;
    // Build the comments HTML
    let commentsHTML = "";
    if (post.comments.length > 0) {
      post.comments.forEach(comment => {
        commentsHTML += `<p><strong>${comment.user}:</strong> ${comment.text}</p>`;
      });
    }

    // Build media HTML
    let mediaHTML = "";
    if (post.media) {
      if (post.media.startsWith("data:image")) {
        mediaHTML = `<img src="${post.media}" style="max-width:100%; margin-top:8px; border-radius:8px;">`;
      } else if (post.media.startsWith("data:video")) {
        mediaHTML = `<video controls style="max-width:100%; margin-top:8px; border-radius:8px;">
                        <source src="${post.media}">
                     </video>`;
      }
    }


    postDiv.innerHTML = `
      <h4>${post.user}</h4>
      <p>${post.content}</p>
      ${mediaHTML}
      <small>${post.time}</small>
      <br><br>
     <div class="postActionsRow">
      <button onclick="likePost(${post.id})">${heart} ${likesCount}</button>
      <button onclick="toggleCommentBox(${post.id})">Comment</button>
      <button onclick="viewPost(${post.id})">View</button>
      <button onclick="deletePost(${post.id})">Delete</button>
     </div>
      <div id="commentBox-${post.id}" style="display:none; margin-top:8px;">
        <input type="text" id="commentInput-${post.id}" placeholder="Write a comment..." style="width:70%;">
        <button onclick="addComment(${post.id})">Post</button>
      </div>
      <div id="comments-${post.id}" style="margin-top:8px;">
        ${commentsHTML}
      </div>
    `;

    feed.appendChild(postDiv);

  });
}

// Create a new post
function createPost() {
  let content = document.getElementById("postContent").value;
  let mediaInput = document.getElementById("postMedia");
  let file = mediaInput.files[0];


  if (content.trim() === "" && !file) {
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
    comments: [],
    media: null,
  };

  if (file) {
    let reader = new FileReader();
    reader.onload = function(e) {
      newPost.media = e.target.result;
      posts.push(newPost);
      localStorage.setItem("posts", JSON.stringify(posts));
      document.getElementById("postContent").value = "";
      mediaInput.value = "";
      loadFeed();
    };
    reader.readAsDataURL(file);
  } else {

    posts.push(newPost);
    localStorage.setItem("posts", JSON.stringify(posts));
    document.getElementById("postContent").value = "";
    loadFeed();
  }
 
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

//add a like 
function likePost(id) {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  let currentUser = localStorage.getItem("currentUser") || "User";

  posts = posts.map(post => {
    if (post.id === id) {
      // If user already liked, remove like; otherwise, add like
      if (post.likes.includes(currentUser)) {
        post.likes = post.likes.filter(user => user !== currentUser);
      } else {
        post.likes.push(currentUser);
      }
    }
    return post;
  });

  localStorage.setItem("posts", JSON.stringify(posts));
  loadFeed();
}

//add comment sec

function toggleCommentBox(id) {
  let box = document.getElementById(`commentBox-${id}`);
  if (box.style.display === "none") {
    box.style.display = "block";
  } else {
    box.style.display = "none";
  }
}

function addComment(id) {
  let input = document.getElementById(`commentInput-${id}`);
  let commentText = input.value.trim();

  if (commentText === "") {
    alert("Comment cannot be empty");
    return;
  }

  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  let currentUser = localStorage.getItem("currentUser") || "User";

  posts = posts.map(post => {
    if (post.id === id) {
      post.comments.push({ user: currentUser, text: commentText });
    }
    return post;
  });

  localStorage.setItem("posts", JSON.stringify(posts));
  input.value = "";
  loadFeed();
}