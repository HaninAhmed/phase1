"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";



function PostCard({ post, currentUser, currentUserId, onDelete, onView }) {
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

  return (
    <div className="post">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <strong style={{ color: "#d85c9d" }}>@{currentUser}</strong>
          <span style={{ color: "#999", fontSize: 12, marginLeft: 10 }}>
            {post.time}
          </span>
        </div>
        <button onClick={() => onDelete(post.id)} className="deletebtn">
          Delete
        </button>
      </div>

      <p>{post.content}</p>

      <div className="postActionsRow">
        <button onClick={toggleLike}>
          {liked ? "Unlike" : "Like"} ({likeCount})
        </button>
        <button onClick={() => setShowComment((s) => !s)}>
          Comment ({comments.length})
        </button>
        <button onClick={() => onView(post.id)} className="secBtn">
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
                <PostCard
                  key={post.id}
                  post={post}
                  currentUser={currentUser}
                  currentUserId={currentUserId}
                  onDelete={(id) => setPosts((prev) => prev.filter((p) => p.id !== id))}
                  onView={(id) => router.push(`/post?id=${id}`)}
                />
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
