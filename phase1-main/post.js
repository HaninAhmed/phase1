document.addEventListener("DOMContentLoaded", showPost);

function showPost(){

let params = new URLSearchParams(window.location.search);

let postId = params.get("id");

let posts = JSON.parse(localStorage.getItem("posts")) || [];

let post = posts.find(p => p.id == postId);

let container = document.getElementById("postDetail");

if(post){

container.innerHTML = `
<h3>${post.user}</h3>
<p>${post.content}</p>
<small>${post.time}</small>
`;

}

}