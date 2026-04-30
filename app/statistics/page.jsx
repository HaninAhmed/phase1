"use client";

import { useEffect, useState } from "react";

const styles = `
  .page {
    max-width: 800px;
    margin: 30px auto;
    padding: 0 20px;
    font-family: Arial, sans-serif;
  }

  .card {
    background: #ffffff;
    border-radius: 18px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.08);
    padding: 20px;
    margin-bottom: 20px;
  }

  h1 {
    color: #f07bb8;
    margin-bottom: 10px;
  }

  h2 {
    color: #d85c9d;
    margin-bottom: 12px;
  }

  .statsRow {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .statBox {
    background: #f3e9fb;
    padding: 8px 14px;
    border-radius: 999px;
    font-size: 14px;
    color: #6a5acd;
    font-weight: 600;
  }

  .leaderboardRow {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #eee;
    font-size: 14px;
  }

  .leaderboardRow:last-child {
    border-bottom: none;
  }

  .backLink {
    display: inline-block;
    margin-bottom: 15px;
    color: #6a5acd;
    font-weight: 600;
    text-decoration: none;
  }

  .backLink:hover {
    text-decoration: underline;
  }

  .msg {
    text-align: center;
    color: #666;
    margin-top: 20px;
  }

  .error {
    text-align: center;
    color: red;
    margin-top: 20px;
  }
`;

export default function StatisticsPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

  return (
    <>
      {/* SAFE STYLE INJECTION */}
      <style>{styles}</style>

      <div className="page">
        <a href="/" className="backLink">← Back</a>

        <div className="card">
          <h1> Statistics</h1>
          <p>Postify insights</p>
        </div>

        {loading && <p className="msg">Loading...</p>}
        {error && <p className="error">{error}</p>}

        {stats && stats.platformOverview && (
          <>
            {/* Overview */}
            <div className="card">
              <h2>Overview</h2>
              <div className="statsRow">
                <div className="statBox">{stats.platformOverview.totalUsers} Users</div>
                <div className="statBox">{stats.platformOverview.totalPosts} Posts</div>
                <div className="statBox">{stats.platformOverview.totalComments} Comments</div>
                <div className="statBox">{stats.platformOverview.totalLikes} Likes</div>
                <div className="statBox">{stats.platformOverview.totalFollows} Follows</div>
              </div>
            </div>

            {/* Highlights */}
            <div className="card">
              <h2>Highlights</h2>
              <p> Most Active: @{stats.mostActiveUser?.username}</p>
              <p> Most Liked: {stats.mostLikedPost?._count?.likes} </p>
              <p> Most Commented: {stats.mostCommentedPost?._count?.comments} </p>
              <p> Most Followed: @{stats.mostFollowedUser?.username}</p>
              <p> Avg Posts/User: {stats.avgPostsPerUser}</p>
              <p> Most Likes Given: {stats.mostLikingUser?.username}</p>
            </div>

            {/* Leaderboard */}
            <div className="card">
              <h2> Top 3 Users</h2>
              {stats.top3ActiveUsers?.map((user, i) => (
                <div key={user.username} className="leaderboardRow">
                  <span>#{i + 1} @{user.username}</span>
                  <span>{user._count.posts} posts</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}