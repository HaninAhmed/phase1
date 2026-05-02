
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function PostCard({ post, currentUser, currentUserId, onDelete }) {
  const router = useRouter();
  const [liked, setLiked] = useState(
    post.likes?.some((l) => l.userId === parseInt(currentUserId))
  );
  const [likeCount, setLikeCount] = useState(post._count?.likes || 0);
  const [showComment, setShowComment] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(post.comments || []);

  async function toggleLike() {
    const res = await fetch("/api/likes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: currentUserId, postId: post.id }),
    });
    const data = await res.json();
    setLiked(data.liked);
    setLikeCount((c) => (data.liked ? c + 1 : c - 1));
  }

  async function addComment() {
    if (!commentText.trim()) return;
    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: commentText,
        userId: currentUserId,
        postId: post.id,
      }),
    });
    const c = await res.json();
    setComments((prev) => [...prev, c]);
    setCommentText("");
  }

  async function delComment(id) {
    await fetch(`/api/comments?id=${id}`, { method: "DELETE" });
    setComments((prev) => prev.filter((c) => c.id !== id));
  }

  async function delPost() {
    await fetch(`/api/posts/${post.id}`, { method: "DELETE" });
    onDelete(post.id);
  }

  return (
    <div className="post">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <strong style={{ color: "#d85c9d" }}>@{post.user?.username}</strong>
          <span style={{ color: "#999", fontSize: 12, marginLeft: 10 }}>
            {post.time}
          </span>
        </div>
        {post.user?.username === currentUser && (
          <button onClick={delPost} className="deletebtn">
            Delete
          </button>
        )}
      </div>

      <p>{post.content}</p>

      {post.media && post.media.startsWith("data:image") && (
        <img
          src={post.media}
          style={{ maxWidth: "100%", borderRadius: 8, marginBottom: 8 }}
        />
      )}

      <div className="postActionsRow">
        <button onClick={toggleLike}>
          {liked ? "Unlike" : "Like"} ({likeCount})
        </button>
        <button onClick={() => setShowComment((s) => !s)}>
          Comment ({comments.length})
        </button>
        <button onClick={() => router.push(`/post?id=${post.id}`)}>
          View
        </button>
      </div>

      {showComment && (
        <div>
          {comments.map((c) => (
            <div key={c.id} className="commentItem">
              <strong>{c.user?.username}:</strong> {c.text}
              {c.user?.username === currentUser && (
                <button
                  onClick={() => delComment(c.id)}
                  className="deletebtn"
                  style={{ marginLeft: 8 }}
                >
                  Delete
                </button>
              )}
            </div>
          ))}
          <div className="addCommentBox">
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addComment()}
              placeholder="Write a comment..."
            />
            <button onClick={addComment} className="mainBtn">
              Comment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function HomePage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = sessionStorage.getItem("currentUser");
    const userId = sessionStorage.getItem("currentUserId");
    if (!user) { router.push("/login"); return; }
    setCurrentUser(user);
    setCurrentUserId(userId);
    loadFeed(userId);
    loadTopUsers();
  }, []);

  async function loadFeed(userId) {
    setLoading(true);
    try {
      const res = await fetch(`/api/posts?userId=${userId}`);
      const data = await res.json();
      setPosts(data);
    } catch { }
    finally { setLoading(false); }
  }

  async function loadTopUsers() {
    try {
      const res = await fetch("/api/statistics");
      const data = await res.json();
      setTopUsers(data.top3ActiveUsers || []);
    } catch { }
  }

  async function createPost() {
    if (!content.trim()) return;
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, userId: currentUserId }),
    });
    if (res.ok) { setContent(""); loadFeed(currentUserId); }
  }

  function logout() {
    sessionStorage.clear();
    router.push("/login");
  }

  return (
    <>
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

      <main>
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
          <button className="mainBtn" onClick={() => router.push("/feed")}>
            + New Post
          </button>
        </aside>

        <section className="centerSide">
          <h2>Welcome to Postify!</h2>

          <div className="post">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              rows={3}
            />
            <div className="postActionsRow">
              <button onClick={createPost} className="mainBtn">
                Post
              </button>
            </div>
          </div>

          {loading ? (
            <p className="msg">Loading...</p>
          ) : posts.length === 0 ? (
            <p className="msg">No posts yet. Follow some users!</p>
          ) : (
            posts.map((p) => (
              <PostCard
                key={p.id}
                post={p}
                currentUser={currentUser}
                currentUserId={currentUserId}
                onDelete={(id) =>
                  setPosts((prev) => prev.filter((p) => p.id !== id))
                }
              />
            ))
          )}
        </section>

        <aside className="rightSideBar">
          <section className="userSideInfo">
            <img
              src="/images/profilePhoto.png"
              alt="userPhoto"
              className="userPhoto"
            />
            <div className="userInfo">
              <p className="userName">{currentUser}</p>
            </div>
          </section>

          <section className="discover">
            <h2>Discover</h2>
            <div id="followList">
              {topUsers.map((u) => (
                <div key={u.username} className="followLine">
                  <div className="followingInfo">
                    <h3>@{u.username}</h3>
                  </div>
                  <span style={{ fontSize: 12, color: "#999" }}>
                    {u._count.posts} posts
                  </span>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </main>

      <footer>
        <p>&copy; 2026 Postify</p>
      </footer>
    </>
  );
}
