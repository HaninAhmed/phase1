"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function StatisticsPage() {
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const user = sessionStorage.getItem("currentUser");
    if (!user) { router.push("/login"); return; }
    setCurrentUser(user);

    fetch("/api/statistics")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load statistics.");
        setLoading(false);
      });
  }, []);

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

        {/* Center — Statistics Content */}
        <section className="centerSide">

          <div className="profileDiv">
            <h2>Statistics</h2>
            <p className="userBio">Postify platform insights</p>
          </div>

          {loading && <p className="msg">Loading...</p>}
          {error && <p className="msg">{error}</p>}

          {stats && stats.platformOverview && (
            <>
              {/* Overview */}
              <div className="post">
                <h3>Overview</h3>
                <div className="userStats">
                  <div>
                    <strong>{stats.platformOverview.totalUsers}</strong>
                    <span> Users</span>
                  </div>
                  <div>
                    <strong>{stats.platformOverview.totalPosts}</strong>
                    <span> Posts</span>
                  </div>
                  <div>
                    <strong>{stats.platformOverview.totalComments}</strong>
                    <span> Comments</span>
                  </div>
                  <div>
                    <strong>{stats.platformOverview.totalLikes}</strong>
                    <span> Likes</span>
                  </div>
                  <div>
                    <strong>{stats.platformOverview.totalFollows}</strong>
                    <span> Follows</span>
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div className="post">
                <h3>Highlights</h3>
                <div className="userPosts">
                  <div className="postActionsRow">
                    <span>Most Active User:</span>
                    <strong>@{stats.mostActiveUser?.username ?? "N/A"}</strong>
                    <span>{stats.mostActiveUser?._count?.posts ?? 0} posts</span>
                  </div>
                  <div className="postActionsRow">
                    <span>Most Liked Post:</span>
                    <strong>{stats.mostLikedPost?._count?.likes ?? 0} likes</strong>
                    <span>by @{stats.mostLikedPost?.user?.username ?? "N/A"}</span>
                  </div>
                  <div className="postActionsRow">
                    <span>Most Commented Post:</span>
                    <strong>{stats.mostCommentedPost?._count?.comments ?? 0} comments</strong>
                    <span>by @{stats.mostCommentedPost?.user?.username ?? "N/A"}</span>
                  </div>
                  <div className="postActionsRow">
                    <span>Most Followed User:</span>
                    <strong>@{stats.mostFollowedUser?.username ?? "N/A"}</strong>
                    <span>{stats.mostFollowedUser?._count?.followers ?? 0} followers</span>
                  </div>
                  <div className="postActionsRow">
                    <span>Avg Posts Per User:</span>
                    <strong>{stats.avgPostsPerUser ?? 0}</strong>
                  </div>
                  <div className="postActionsRow">
                    <span>Most Likes Given:</span>
                    <strong>@{stats.mostLikingUser?.username ?? "N/A"}</strong>
                    <span>{stats.mostLikingUser?._count?.likes ?? 0} likes given</span>
                  </div>
                </div>
              </div>

              {/* Leaderboard */}
              <div className="post">
                <h3>Top 3 Most Active Users</h3>
                <div className="userPosts">
                  {stats.top3ActiveUsers?.map((user, i) => (
                    <div key={user.username} className="postActionsRow">
                      <span>#{i + 1}</span>
                      <strong>@{user.username}</strong>
                      <span>{user._count.posts} posts</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer>
        <p>&copy; 2026 Postify</p>
      </footer>
    </>
  );
}
