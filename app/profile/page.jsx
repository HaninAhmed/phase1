"use client";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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
  const [editPhoto, setEditPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
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
    try {
      const res = await fetch(`/api/users/${username}`);
      if (!res.ok) return;
      const data = await res.json();
      setProfile(data);
      setPosts(data.posts || []);
      setEditUsername(data.username || "");
      setEditBio(data.bio || "");
      if (!own && userId) {
        const fRes = await fetch(
          `/api/follows?followerId=${userId}&followingId=${data.id}`
        );
        const fData = await fRes.json();
        setFollowing(fData.following);
      }
    } catch { }
  }

  async function toggleFollow() {
    const method = following ? "unfollow" : "follow";
    await fetch("/api/follows", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        followerId: parseInt(currentUserId),
        followingId: profile.id,
        action: method,
      }),
    });
    setFollowing((f) => !f);
    setProfile((p) => ({
      ...p,
      _count: {
        ...p._count,
        followers: following
          ? p._count.followers - 1
          : p._count.followers + 1,
      },
    }));
  }

  async function saveProfile(e) {
    e.preventDefault();
    const res = await fetch(`/api/users/${currentUser}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: editUsername, bio: editBio, photo: editPhoto }),
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
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  function logout() {
    sessionStorage.clear();
    router.push("/login");
  }
  function handlePhotoChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setEditPhoto(e.target.result);
      setPhotoPreview(e.target.result);
    };
    reader.readAsDataURL(file);
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
          <button className="mainBtn" onClick={() => router.push("/feed")}>
            + New Post
          </button>
        </aside>

        {/* Center      Profile Content */}
        <section className="centerSide">
          {profile && (
            <>
              <div className="profileDiv">
                <div className="userInfo">
                  <img
                    src={profile.photo || photoPreview || "/images/profilePhoto.png"}
                    alt="profilePhoto"
                    className="profilePhoto"
                  />
                  <div>
                    <h2>@{profile.username}</h2>
                    <p className="userBio">{profile.bio || "No bio yet."}</p>
                  </div>
                  {!isOwn && (
                    <button
                      onClick={toggleFollow}
                      className="mainBtn"
                    >
                      {following ? "Unfollow" : "Follow"}
                    </button>
                  )}
                </div>

                <div className="userStats">
                  <div>
                    <strong>{posts.length}</strong>
                    <span> Posts</span>
                  </div>
                  <div>
                    <strong id="followerCount">
                      {profile._count?.followers ?? 0}
                    </strong>
                    <span> Followers</span>
                  </div>
                  <div>
                    <strong>{profile._count?.following ?? 0}</strong>
                    <span> Following</span>
                  </div>
                </div>
              </div>

              {/* Posts Section */}
              <div className="postSection">
                <h3>My Posts</h3>
                <div className="userPosts">
                  {posts.length === 0 ? (
                    <p className="msg">No posts yet.</p>
                  ) : (
                    posts.map((post) => (
                      <div key={post.id} className="post">
                        <p>{post.content}</p>
                        <small>{post.time}</small>
                        <div className="postActionsRow">
                          <span>
                            Likes: {post._count?.likes} &nbsp; Comments:{" "}
                            {post._count?.comments}
                          </span>
                          <button
                            onClick={() => router.push(`/post?id=${post.id}`)}
                            className="secBtn"
                          >
                            View
                          </button>
                          {isOwn && (
                            <button
                              onClick={() => deletePost(post.id)}
                              className="deletebtn"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </section>

        {/* Right Sidebar — Edit Profile (own profile only) */}
        {isOwn && (
          <aside className="rightSideBar">
            <section className="postCards">
              <h3>Edit Profile</h3>

              {saved && (
                <p style={{ color: "#00b894", fontSize: 13 }}>{saved}</p>
              )}

              <form className="editProfile" onSubmit={saveProfile}>
                <label htmlFor="editUsername">Username:</label>
                <input
                  type="text"
                  id="editUsername"
                  value={editUsername}
                  onChange={(e) => setEditUsername(e.target.value)}
                  placeholder="@username"
                />

                <label htmlFor="editBio">Bio:</label>
                <textarea
                  id="editBio"
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  placeholder="Edit your bio here..."
                />
                <label htmlFor="editPhoto">Change Photo:</label>
                <input
                  type="file"
                  id="editPhoto"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
                {photoPreview && (
                  <img
                    src={photoPreview}
                    alt="Preview"
                    style={{ width: 60, height: 60, borderRadius: "50%", marginTop: 8 }}
                  />
                )}

                <button type="submit" className="mainBtn">
                  Save Changes
                </button>
              </form>
            </section>
          </aside>
        )}
      </main>

      {/* Footer */}
      <footer>
        <p>&copy; 2026 Postify</p>
      </footer>
    </>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<p className="msg">Loading...</p>}>
      <ProfileContent />
    </Suspense>
  );
}
