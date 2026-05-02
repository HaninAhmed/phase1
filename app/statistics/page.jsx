"use client";
import { useEffect, useState } from "react";

export default function StatisticsPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/statistics")
      .then((res) => res.json())
      .then((data) => { setStats(data); setLoading(false); })
      .catch(() => { setError("Failed to load statistics."); setLoading(false); });
  }, []);

  const cardStyle = { background: "#fff", borderRadius: "18px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", padding: "20px", marginBottom: "20px" };

  return (
    <div style={{ maxWidth: "800px", margin: "30px auto", padding: "0 20px", fontFamily: "Arial, sans-serif" }}>
      <div style={cardStyle}>
        <h1 style={{ color: "#f07bb8" }}>📊 Postify Statistics</h1>
        <p>Platform insights</p>
      </div>

      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {stats && (
        <>
          <div style={cardStyle}>
            <h2 style={{ color: "#d85c9d" }}>Overview</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {[["Users", stats.platformOverview?.totalUsers], ["Posts", stats.platformOverview?.totalPosts], ["Comments", stats.platformOverview?.totalComments], ["Likes", stats.platformOverview?.totalLikes], ["Follows", stats.platformOverview?.totalFollows]].map(([label, val]) => (
                <div key={label} style={{ background: "#f3e9fb", padding: "8px 14px", borderRadius: "999px", fontSize: "14px", color: "#6a5acd", fontWeight: 600 }}>{val} {label}</div>
              ))}
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={{ color: "#d85c9d" }}>Highlights</h2>
            <p>🏆 Most Active User: <strong>@{stats.mostActiveUser?.username}</strong> ({stats.mostActiveUser?._count?.posts} posts)</p>
            <p>❤️ Most Liked Post: <strong>{stats.mostLikedPost?._count?.likes} likes</strong> — "{stats.mostLikedPost?.content?.slice(0, 60)}..."</p>
            <p>💬 Most Commented Post: <strong>{stats.mostCommentedPost?._count?.comments} comments</strong></p>
            <p>👥 Most Followed User: <strong>@{stats.mostFollowedUser?.username}</strong> ({stats.mostFollowedUser?._count?.followers} followers)</p>
            <p>📝 Avg Posts Per User: <strong>{stats.avgPostsPerUser}</strong></p>
            <p>👍 Most Likes Given: <strong>@{stats.mostLikingUser?.username}</strong> ({stats.mostLikingUser?._count?.likes} likes given)</p>
          </div>

          <div style={cardStyle}>
            <h2 style={{ color: "#d85c9d" }}>🥇 Top 3 Most Active Users</h2>
            {stats.top3ActiveUsers?.map((user, i) => (
              <div key={user.username} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #eee", fontSize: "14px" }}>
                <span>#{i + 1} @{user.username}</span>
                <span>{user._count.posts} posts</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
