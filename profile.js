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
        document.getElementById("userName").textContent = "user not found";
        return;
    }

    let userNameEle = document.getElementById("userName");
    let profileNameEle = document.querySelector(".userInfo h2");
    let bioEle = document.getElementById("userBio");
    let followersEle = document.getElementById("followerCount");
    let followingEle = document.getElementById("followingCount");
    let profilePicELe = document.getElementById("profilePhoto");
    let sidePicEle = document.getElementById("userPhoto");

    if (userNameEle) {
        userNameEle.textContent = user.username;
    }

    if (profileNameEle) {
        profileNameEle.textContent = "@" + user.name;
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
        if (sidePicEle) {
            sidePicEle.src = user.photo;
        }
    }

    document.getElementById("editUsername").value = user.name || "";
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
    let messgEle = document.getElementById("editProfileMessage");

    postsContainer.innerHTML = "";

    if (postCountEle) {
        postCountEle.textContent = userPosts.length;
    }

    if (userPosts.length === 0) {
        if (messgEle) {
            messgEle.innerHTML = "<small>no posts</small>";
        }
        return;
    }
    
    if (messgEle) {
        messgEle.innerHTML = "";
    }

    userPosts.forEach(function(post) {
        let postCard = document.createElement("div");
        postCard.classList.add("post");

        postCard.innerHTML = `
            h4>${post.user}</h4>
            <p>${post.content}</p>
            <small>${post.time}</small>
            <p><strong>Likes:</strong> ${post.likes ? post.likes.length : 0}</p>
            <p><strong>Comments:</strong> ${post.comments ? post.comments.length : 0}</p>
        `;
        postsContainer.appendChild(postCard);
    });
}


