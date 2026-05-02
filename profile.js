document.addEventListener("DOMContentLoaded", function() {
    loadProfile();
    loadUserPosts();

    let editForm = document.getElementById("editProfile");
    if (editForm) {
        editForm.addEventListener("submit", saveProfileChanges);
    }
});

function getCurrentUser() {
    return localStorage.getItem("currentUser");
}

function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || []; 
}

function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

function getPosts() {
    return JSON.parse(localStorage.getItem("posts")) || [];
}

function loadProfile() {
    let currentUser = getCurrentUser();
    let users = getUsers();

    let user = users.find(function(u) {
        return u.username === currentUser;
    });

    if (!user) {
        alert("User not found");
        return;
    }

    let profileNameEle = document.querySelector(".userInfo h2");
    let bioEle = document.getElementById("userBio");
    let followersEle = document.getElementById("followerCount");
    let followingEle = document.getElementById("followingCount");
    let profilePicELe = document.getElementById("profilePhoto");


    if (profileNameEle) {
        profileNameEle.textContent = "@" + user.username;
    }

    if (bioEle) {
        bioEle.textContent = user.bio || "no bio";
    }

    if (followersEle) {
        followersEle.textContent = user.followers ? user.followers.length : 0;
    }

    if (followingEle) {
        followingEle.textContent = user.following ? user.following.length : 0;
    }

    if (user.photo) {
        if (profilePicELe) {
            profilePicELe.src = user.photo;
        }
    }

    document.getElementById("editUsername").value = user.username || "";
    document.getElementById("editBio").value = user.bio || "";
}

function loadUserPosts() {
    let currentUser = getCurrentUser();
    let posts = getPosts();

    let userPosts = posts.filter(function(post) {
        return post.user === currentUser;
    });

    let postsContainer = document.getElementById("userPosts");
    let postCountEle = document.getElementById("postCount");

    postsContainer.innerHTML = "";

    if (postCountEle) {
        postCountEle.textContent = userPosts.length;
    }

    if (userPosts.length === 0) {
        postsContainer.innerHTML = "<p>No posts yet.</p>";
        return;
}

    userPosts.reverse().forEach(function(post) {
        let postCard = document.createElement("div");
        postCard.classList.add("post");

        postCard.innerHTML = `
            <h4>${post.user}</h4>
            <p>${post.content}</p>
            <small>${post.time}</small>
            <p><strong>Likes:</strong> ${post.likes ? post.likes.length : 0}</p>
            <p><strong>Comments:</strong> ${post.comments ? post.comments.length : 0}</p>
        `;
        postsContainer.appendChild(postCard);
    });
}

function saveProfileChanges(event) {
    event.preventDefault();

    let currentUser = getCurrentUser();
    let users = getUsers();

    let newUserName = document.getElementById("editUsername").value.trim();
    let newBio = document.getElementById("editBio").value.trim();
    let newPhoto = document.getElementById("editPhoto");

    let userIndex = users.findIndex(function(u) {
        return u.username === currentUser;
    });

    if (userIndex === -1) {
        alert("User not found");
        return;
    }

    if (newUserName === "") {
        alert("Username cannot be empty");
        return;
    }

    let takenName = users.some(function(u, index) {
        return u.username === newUserName && index !== userIndex;
    });

    if (takenName) {
        alert("Username already taken");
        return;
    }

    let oldName = users[userIndex].username;
    users[userIndex].username = newUserName;
    users[userIndex].bio = newBio;

    let posts = getPosts();
    posts = posts.map(function(post) {
        if (post.user === oldName) {
            post.user = newUserName;
        }

        if (post.likes) {
            post.likes = post.likes.map(function(likeUser) {
                return likeUser === oldName ? newUserName : likeUser;
            });
        }

        if (post.comments) {
            post.comments = post.comments.map(function(comment) {
                if (comment.user === oldName) {
                    comment.user = newUserName;
                }
                return comment;
            });
        }

        return post;
    });

    localStorage.setItem("posts", JSON.stringify(posts));
    localStorage.setItem("currentUser", newUserName);

    if (newPhoto.files && newPhoto.files[0]) {
        let reader = new FileReader();

        reader.onload = function(e) {
            users[userIndex].photo = e.target.result;
            saveUsers(users);
            loadProfile();
            loadUserPosts();
            alert("Profile updated!");
        };

        reader.readAsDataURL(newPhoto.files[0]);
    } else {
        saveUsers(users);
        loadProfile();
        loadUserPosts();
        alert("Profile updated!");
    }
}