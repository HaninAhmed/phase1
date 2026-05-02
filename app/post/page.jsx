"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PostPage() {
    const router = useRouter();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState("");
    const [currentUserId, setCurrentUserId] = useState("");
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");

    useEffect(() => {
        const user = sessionStorage.getItem("currentUser");
        const userId = sessionStorage.getItem("currentUserId");
        if (!user) { router.push("/login"); return; }
        setCurrentUser(user);
        setCurrentUserId(userId);

        // Get post id from URL
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");
        if (!id) { setLoading(false); return; }

        loadPost(id, userId);
    }, []);

    async function loadPost(id, userId) {
        setLoading(true);
        try {
            const res = await fetch(`/api/posts/${id}`);
            if (!res.ok) { setLoading(false); return; }
            const data = await res.json();
            setPost(data);
            setLiked(data.likes?.some((l) => l.userId === parseInt(userId)));
            setLikeCount(data._count?.likes || 0);
            setComments(data.comments || []);
        } catch { }
        finally { setLoading(false); }
    }

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

    async function deleteComment(id) {
        await fetch(`/api/comments?id=${id}`, { method: "DELETE" });
        setComments((prev) => prev.filter((c) => c.id !== id));
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

                {/* Post View */}
                <div className="postViewPage">
                    <span className="backLink" onClick={() => router.back()} style={{ cursor: "pointer" }}>
                        ← Go Back
                    </span>

                    {loading && <p className="msg">Loading...</p>}

                    {!loading && !post && (
                        <p className="msg">Post not found.</p>
                    )}

                    {post && (
                        <div className="postFull">
                            {/* Post Author */}
                            <div className="postAuthor">@{post.user?.username}</div>
                            <div className="postTime">{post.time}</div>

                            {/* Post Content */}
                            <div className="postBody">
                                {post.content}
                                {post.media && post.media.startsWith("data:image") && (
                                    <img
                                        src={post.media}
                                        style={{ maxWidth: "100%", marginTop: 8, borderRadius: 8 }}
                                    />
                                )}
                            </div>

                            {/* Post Actions */}
                            <div className="postActions">
                                <button onClick={toggleLike} className="secBtn">
                                    {liked ? "Unlike" : "Like"} ({likeCount})
                                </button>
                                {post.user?.username === currentUser && (
                                    <button
                                        onClick={async () => {
                                            await fetch(`/api/posts/${post.id}`, { method: "DELETE" });
                                            router.push("/feed");
                                        }}
                                        className="deletebtn"
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>

                            {/* Comments Section */}
                            <div className="commentsSection">
                                <h3>Comments ({comments.length})</h3>

                                <div className="commentsList">
                                    {comments.length === 0 ? (
                                        <p className="msg">No comments yet. Be the first!</p>
                                    ) : (
                                        comments.map((c) => (
                                            <div key={c.id} className="commentItem">
                                                <span>
                                                    <strong>{c.user?.username}:</strong> {c.text}
                                                </span>
                                                {c.user?.username === currentUser && (
                                                    <button
                                                        onClick={() => deleteComment(c.id)}
                                                        className="deletebtn"
                                                        style={{ marginLeft: 8 }}
                                                    >
                                                        Delete
                                                    </button>
                                                )}
                                            </div>
                                        ))
                                    )}
                                </div>

                                {/* Add Comment */}
                                <div className="addCommentBox">
                                    <input
                                        type="text"
                                        value={commentText}
                                        onChange={(e) => setCommentText(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && addComment()}
                                        placeholder="Write a comment..."
                                    />
                                    <button onClick={addComment} className="mainBtn">
                                        Post
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer>
                <p>&copy; 2026 Postify</p>
            </footer>
        </>
    );
}