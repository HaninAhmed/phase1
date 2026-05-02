"use client";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const S = {
  wrap: { margin: 0, fontFamily: "'Franklin Gothic Medium','Arial Narrow',Arial,sans-serif", backgroundColor: "#faf7fb", minHeight: "100vh" },
  header: { background: "#fff", borderBottom: "1px solid #eee", position: "sticky", top: 0, zIndex: 10 },
  headerInner: { maxWidth: 1100, margin: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 20px" },
  logo: { fontSize: 22, fontWeight: 800, color: "#f07bb8", margin: 0 },
  main: { maxWidth: 1100, margin: "auto", display: "flex", gap: 24, padding: "24px 20px" },
  sidebar: { width: 200, flexShrink: 0 },
  center: { flex: 1, minWidth: 0 },
  right: { width: 260, flexShrink: 0 },
  navLink: { display: "block", padding: "10px 14px", borderRadius: 8, color: "#6a5acd", fontWeight: 600, marginBottom: 6, cursor: "pointer", textDecoration: "none" },
  card: { background: "#fff", borderRadius: 18, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", padding: 20, marginBottom: 16 },
  btn: { padding: "8px 20px", background: "#f07bb8", color: "#fff", border: "none", borderRadius: 999, fontWeight: 700, cursor: "pointer", fontSize: 14 },
  btnOutline: { padding: "8px 20px", background: "transparent", color: "#6a5acd", border: "1px solid #6a5acd", borderRadius: 999, fontWeight: 700, cursor: "pointer", fontSize: 14 },
  input: { width: "100%", padding: "10px 12px", border: "1px solid #ddd", borderRadius: 8, fontSize: 14, boxSizing: "border-box", marginBottom: 12, fontFamily: "inherit" },
};

function ProfileContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentUser, setCurrentUser] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isOwn, setIsOwn] = useState(false);
  const [following, setFollowing] = useState(false);
  const [editUsername, setEditUsername] = useState("");
  const [editBio, setEditBio] = useState("");
  const [saved, setSaved] = useState("");

  useEffect(() => {
    const user = sessionStorage.getItem("currentUser");
    const userId = sessionStorage.getItem("currentUserId");
    if (!user) { router.push("/login"); return; }
    setCurrentUser(user);
    setCurrentUserId(userId);
    const targetUser = searchParams.get("user") || user;
    const own = targetUser === user;
    setIsOwn(own);
    loadProfile(targetUser, userId, own);
  }, []);

  async function loadProfile(username, userId, own) {
    const res = await fetch(`/api/users/${username}`);
    if (!res.ok) return;
    const data = await res.json();
    setProfile(data);
    setPosts(data.posts || []);
    setEditUsername(data.username || "");
    setEditBio(data.bio || "");
    if (!own && userId) {
      const fRes = await fetch(`/api/follows?followerId=${userId}&followingId=${data.id}`);
      const fData = await fRes.json();
      setFollowing(fData.following);
    }
  }

  async function toggleFollow() {
    const method = following ? "DELETE" : "POST";
    await fetch("/api/follows", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ followerId: parseInt(currentUserId), followingId: profile.id }),
    });
    setFollowing(f => !f);
    setProfile(p => ({
      ...p,
      _count: { ...p._count, followers: following ? p._count.followers - 1 : p._count.followers + 1 }
    }));
  }

  async function saveProfile() {
    const res = await fetch(`/api/users/${currentUser}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: editUsername, bio: editBio }),
    });
    if (res.ok) {
      if (editUsername !== currentUser) {
        sessionStorage.setItem("currentUser", editUsername);
        setCurrentUser(editUsername);
      }
      setSaved("Profile updated!");
      setTimeout(() => setSaved(""), 2000);
      loadProfile(editUsername, currentUserId, true);
    }
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

        {/* Profile Content */}
        <section style={S.center}>
          {profile && (
            <>
              <div style={S.card}>
                <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
                  <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#f3e9fb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>
                    👤
                  </div>
                  <div style={{ flex: 1 }}>
                    <h2 style={{ margin: "0 0 4px", color: "#d85c9d" }}>@{profile.username}</h2>
                    <p style={{ margin: 0, color: "#666", fontSize: 14 }}>{profile.bio || "No bio yet."}</p>
                  </div>
                  {!isOwn && (
                    <button onClick={toggleFollow} style={following ? S.btnOutline : S.btn}>
                      {following ? "Unfollow" : "Follow"}
                    </button>
                  )}
                </div>
                <div style={{ display: "flex", marginTop: 16, borderTop: "1px solid #f5f5f5", paddingTop: 16 }}>
                  {[["Posts", posts.length], ["Followers", profile._count?.followers], ["Following", profile._count?.following]].map(([label, val]) => (
                    <div key={label} style={{ textAlign: "center", padding: "10px 20px" }}>
                      <span style={{ display: "block", fontSize: 22, fontWeight: 800, color: "#6a5acd" }}>{val ?? 0}</span>
                      <span style={{ fontSize: 12, color: "#999" }}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <h3 style={{ color: "#6a5acd" }}>Posts</h3>
              {posts.length === 0
                ? <p style={{ color: "#999" }}>No posts yet.</p>
                : posts.map(post => (
                  <div key={post.id} style={S.card}>
                    <p style={{ margin: "0 0 8px" }}>{post.content}</p>
                    <small style={{ color: "#999" }}>{post.time}</small>
                    <div style={{ marginTop: 8, fontSize: 13, color: "#6a5acd" }}>
                      ❤️ {post._count?.likes}  💬 {post._count?.comments}
                      {isOwn && (
                        <button
                          onClick={() => deletePost(post.id)}
                          style={{ marginLeft: 12, background: "none", border: "none", color: "#e0245e", cursor: "pointer", fontSize: 13 }}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))
              }
            </>
          )}
        </section>

        {/* Edit Profile (only for own profile) */}
        {isOwn && (
          <aside style={S.right}>
            <div style={S.card}>
              <h3 style={{ margin: "0 0 16px", color: "#6a5acd" }}>Edit Profile</h3>
              {saved && (
                <div style={{ background: "#e8f5e9", color: "#2e7d32", padding: "8px 12px", borderRadius: 8, marginBottom: 12, fontSize: 13 }}>
                  {saved}
                </div>
              )}
              <label style={{ fontSize: 13, fontWeight: 600, color: "#333" }}>Username</label>
              <input value={editUsername} onChange={e => setEditUsername(e.target.value)} style={S.input} />
              <label style={{ fontSize: 13, fontWeight: 600, color: "#333" }}>Bio</label>
              <textarea
                value={editBio}
                onChange={e => setEditBio(e.target.value)}
                style={{ ...S.input, minHeight: 80, resize: "vertical" }}
              />
              <button onClick={saveProfile} style={S.btn}>Save Changes</button>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<p style={{ textAlign: "center", marginTop: 40 }}>Loading...</p>}>
      <ProfileContent />
    </Suspense>
  );
}