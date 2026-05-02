"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const S = {
  wrap: { margin: 0, fontFamily: "'Franklin Gothic Medium','Arial Narrow',Arial,sans-serif", backgroundColor: "#faf7fb", minHeight: "100vh" },
  header: { background: "#fff", borderBottom: "1px solid #eee", position: "sticky", top: 0, zIndex: 10 },
  headerInner: { maxWidth: 1100, margin: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 20px" },
  logo: { fontSize: 22, fontWeight: 800, color: "#f07bb8", margin: 0 },
  main: { maxWidth: 900, margin: "auto", display: "flex", gap: 24, padding: "24px 20px" },
  sidebar: { width: 200, flexShrink: 0 },
  center: { flex: 1, minWidth: 0 },
  navLink: { display: "block", padding: "10px 14px", borderRadius: 8, color: "#6a5acd", fontWeight: 600, marginBottom: 6, cursor: "pointer", textDecoration: "none" },
  card: { background: "#fff", borderRadius: 18, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", padding: 20, marginBottom: 16 },
  btn: { padding: "8px 18px", background: "#f07bb8", color: "#fff", border: "none", borderRadius: 999, fontWeight: 700, cursor: "pointer", fontSize: 14 },
  textarea: { width: "100%", minHeight: 80, padding: 12, border: "1px solid #ddd", borderRadius: 8, fontSize: 14, resize: "vertical", boxSizing: "border-box", fontFamily: "inherit" },
};

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
    } catch { } finally { setLoading(false); }
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
    setPosts(prev => prev.filter(p => p.id !== id));
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

        {/* My Posts */}
        <section style={S.center}>
          <div style={S.card}>
            <h3 style={{ margin: "0 0 12px", color: "#6a5acd" }}>Create Post</h3>
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="What do you want to post?"
              style={S.textarea}
            />
            <div style={{ textAlign: "right", marginTop: 8 }}>
              <button onClick={createPost} style={S.btn}>Post</button>
            </div>
          </div>

          <h2 style={{ color: "#d85c9d", marginBottom: 12 }}>My Posts</h2>

          {loading
            ? <p style={{ textAlign: "center", color: "#999" }}>Loading...</p>
            : posts.length === 0
              ? <p style={{ color: "#999" }}>You haven't posted yet.</p>
              : posts.map(post => (
                <div key={post.id} style={S.card}>
                  <p style={{ margin: "0 0 8px", color: "#333" }}>{post.content}</p>
                  <small style={{ color: "#999" }}>{post.time}</small>
                  <div style={{ display: "flex", gap: 12, marginTop: 10, alignItems: "center", fontSize: 13, color: "#6a5acd" }}>
                    <span>❤️ {post._count?.likes}  💬 {post._count?.comments}</span>
                    <button
                      onClick={() => deletePost(post.id)}
                      style={{ background: "none", border: "1px solid #e0245e", color: "#e0245e", borderRadius: 999, padding: "4px 12px", cursor: "pointer", fontSize: 13 }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
          }
        </section>
      </div>
    </div>
  );
}