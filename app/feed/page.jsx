"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function FeedPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = sessionStorage.getItem("currentUser");
    const userId = sessionStorage.getItem("currentUserId");
    if (!user) { router.push("/login"); return; }
    setCurrentUser(user);
    setCurrentUserId(userId);
    loadMyPosts(user);
  }, []);

  async function loadMyPosts(username) {
    setLoading(true);
    try {
      const res = await fetch(`/api/users/${username}`);
      const data = await res.json();
      setPosts(data.posts || []);
    } catch { }
    finally { setLoading(false); }
  }

  async function createPost() {
    if (!content.trim()) return;
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, userId: currentUserId }),
    });
    if (res.ok) { setContent(""); loadMyPosts(currentUser); }
  }

  async function deletePost(id) {
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  function logout() {
    sessionStorage.clear();
    router.push("/login");
  }

  return (
    <>
      {/* Header */}
      <header>
        <section className="topBar">
          <div className="logowithtext">
            <a href="/home">
              <img
                src="/images/postify logo.png"
                alt="Postify Logo"
                className="logo"
              />
            </a>
            <h1>Postify</h1>
          </div>
        </section>
      </header>

      {/* Main */}
      <main>
        {/* Left Sidebar */}
        <aside className="leftSideBar">
          <nav className="navBar">
            <a href="/home" className="pageLink">Home</a>
            <a href="/feed" className="pageLink">My Posts</a>
            <a href="/profile" className="pageLink">Profile</a>
            <a href="/statistics" className="pageLink">Statistics</a>
            <span
              onClick={logout}
              className="pageLink"
              style={{ cursor: "pointer" }}
            >
              Log out
            </span>
          </nav>
        </aside>

        {/* Center — Post Section */}
        <div className="postSection">

          {/* Create Post */}
          <div className="post">
            <h3>Create Post</h3>
            <textarea
              id="postContent"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What do you want to post?"
            />
            <button onClick={createPost} className="mainBtn">
              Post
            </button>
          </div>

          {/* My Posts Feed */}
          <div id="mypostFeed">
            {loading ? (
              <p className="msg">Loading...</p>
            ) : posts.length === 0 ? (
              <p className="msg">You have not posted yet.</p>
            ) : (
              posts.map((post) => (
                <div key={post.id} className="post">
                  <h4>@{currentUser}</h4>
                  <p>{post.content}</p>
                  <small>{post.time}</small>
                  <div className="postActionsRow">
                    <span>
                      Likes: {post._count?.likes} &nbsp; Comments: {post._count?.comments}
                    </span>
                    <button
                      onClick={() => router.push(`/post?id=${post.id}`)}
                      className="secBtn"
                    >
                      View
                    </button>
                    <button
                      onClick={() => deletePost(post.id)}
                      className="deletebtn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer>
        <p>&copy; 2026 Postify</p>
      </footer>
    </>
  );
}
