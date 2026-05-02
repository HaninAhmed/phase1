"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const S = {
  wrap: { margin: 0, fontFamily: "'Franklin Gothic Medium','Arial Narrow',Arial,sans-serif", backgroundColor: "#faf7fb", minHeight: "100vh" },
  header: { background: "#fff", borderBottom: "1px solid #eee", position: "sticky", top: 0, zIndex: 10 },
  headerInner: { maxWidth: 1100, margin: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 20px" },
  logo: { fontSize: 22, fontWeight: 800, color: "#f07bb8", margin: 0 },
  main: { maxWidth: 1100, margin: "auto", display: "flex", gap: 24, padding: "24px 20px" },
  sidebar: { width: 200, flexShrink: 0 },
  center: { flex: 1, minWidth: 0 },
  right: { width: 220, flexShrink: 0 },
  navLink: { display: "block", padding: "10px 14px", borderRadius: 8, color: "#6a5acd", fontWeight: 600, marginBottom: 6, cursor: "pointer", textDecoration: "none" },
  card: { background: "#fff", borderRadius: 18, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", padding: 20, marginBottom: 16 },
  btn: { padding: "8px 18px", background: "#f07bb8", color: "#fff", border: "none", borderRadius: 999, fontWeight: 700, cursor: "pointer", fontSize: 14 },
  btnGhost: { padding: "6px 14px", background: "transparent", color: "#6a5acd", border: "1px solid #6a5acd", borderRadius: 999, fontWeight: 600, cursor: "pointer", fontSize: 13 },
  textarea: { width: "100%", minHeight: 80, padding: 12, border: "1px solid #ddd", borderRadius: 8, fontSize: 14, resize: "vertical", boxSizing: "border-box", fontFamily: "inherit" },
  tag: { background: "#f3e9fb", padding: "4px 12px", borderRadius: 999, fontSize: 13, color: "#6a5acd", fontWeight: 600 },
};

function PostCard({ post, currentUser, currentUserId, onDelete }) {
  const [liked, setLiked] = useState(post.likes?.some(l => l.userId === parseInt(currentUserId)));
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
    setLikeCount(c => data.liked ? c + 1 : c - 1);
  }

  async function addComment() {
    if (!commentText.trim()) return;
    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: commentText, userId: currentUserId, postId: post.id }),
    });
    const c = await res.json();
    setComments(prev => [...prev, c]);
    setCommentText("");
  }

  async function delComment(id) {
    await fetch(`/api/comments?id=${id}`, { method: "DELETE" });
    setComments(prev => prev.filter(c => c.id !== id));
  }

  async function delPost() {
    await fetch(`/api/posts/${post.id}`, { method: "DELETE" });
    onDelete(post.id);
  }

  return (
    <div style={S.card}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <strong style={{ color: "#d85c9d" }}>@{post.user?.username}</strong>
          <span style={{ color: "#999", fontSize: 12, marginLeft: 10 }}>{post.time}</span>
        </div>
        {post.user?.username === currentUser && (
          <button onClick={delPost} style={{ background: "none", border: "none", color: "#ccc", cursor: "pointer", fontSize: 18 }}>×</button>
        )}
      </div>
      <p style={{ margin: "10px 0", color: "#333" }}>{post.content}</p>
      {post.media && post.media.startsWith("data:image") && (
        <img src={post.media} style={{ maxWidth: "100%", borderRadius: 8, marginBottom: 8 }} />
      )}
      <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
        <button onClick={toggleLike} style={{ ...S.btnGhost, color: liked ? "#e0245e" : "#6a5acd", borderColor: liked ? "#e0245e" : "#6a5acd" }}>
          {liked ? "❤️" : "🤍"} {likeCount}
        </button>
        <button onClick={() => setShowComment(s => !s)} style={S.btnGhost}>
          💬 {comments.length}
        </button>
      </div>
      {showComment && (
        <div style={{ marginTop: 12 }}>
          {comments.map(c => (
            <div key={c.id} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #f5f5f5", fontSize: 14 }}>
              <span><strong>{c.user?.username}:</strong> {c.text}</span>
              {c.user?.username === currentUser && (
                <button onClick={() => delComment(c.id)} style={{ background: "none", border: "none", color: "#ccc", cursor: "pointer" }}>×</button>
              )}
            </div>
          ))}
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <input
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addComment()}
              placeholder="Write a comment..."
              style={{ flex: 1, padding: "8px 12px", border: "1px solid #ddd", borderRadius: 999, fontSize: 13 }}
            />
            <button onClick={addComment} style={S.btn}>Post</button>
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
    } catch { } finally { setLoading(false); }
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

  function logout() { sessionStorage.clear(); router.push("/login"); }

  return (
    <div style={S.wrap}>
      <header style={S.header}>
        <div style={S.headerInner}>
          <h1 style={S.logo}>Postify</h1>
          <span style={{ color: "#999", fontSize: 14 }}>@{currentUser}</span>
        </div>
      </header>

      <div style={S.main}>
        {/* Left Sidebar */}
        <aside style={S.sidebar}>
          <div style={S.card}>
            <a href="/home" style={S.navLink}>🏠 Home</a>
            <a href="/feed" style={S.navLink}>📝 My Posts</a>
            <a href="/profile" style={S.navLink}>👤 Profile</a>
            <a href="/statistics" style={S.navLink}>📊 Statistics</a>
            <div onClick={logout} style={{ ...S.navLink, color: "#999" }}>🚪 Log out</div>
          </div>
        </aside>

        {/* Center Feed */}
        <section style={S.center}>
          <div style={S.card}>
            <h3 style={{ margin: "0 0 12px", color: "#6a5acd" }}>Create Post</h3>
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="What's on your mind?"
              style={S.textarea}
            />
            <div style={{ textAlign: "right", marginTop: 8 }}>
              <button onClick={createPost} style={S.btn}>Post</button>
            </div>
          </div>

          {loading
            ? <p style={{ textAlign: "center", color: "#999" }}>Loading...</p>
            : posts.length === 0
              ? <p style={{ textAlign: "center", color: "#999" }}>No posts yet. Follow some users!</p>
              : posts.map(p => (
                <PostCard
                  key={p.id}
                  post={p}
                  currentUser={currentUser}
                  currentUserId={currentUserId}
                  onDelete={id => setPosts(prev => prev.filter(p => p.id !== id))}
                />
              ))
          }
        </section>

        {/* Right Sidebar */}
        <aside style={S.right}>
          <div style={S.card}>
            <h3 style={{ margin: "0 0 12px", color: "#6a5acd" }}>🏆 Top Users</h3>
            {topUsers.map(u => (
              <div key={u.username} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f5f5f5", fontSize: 14 }}>
                <span style={{ color: "#d85c9d", fontWeight: 600 }}>@{u.username}</span>
                <span style={S.tag}>{u._count.posts} posts</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}