"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("currentUser")) {
      router.push("/home");
    }
  }, []);

  function isValidEmail(e) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  }

  async function handleRegister() {
    setError(""); setSuccess("");
    if (!username || !email || !password || !confirm) {
      setError("Please fill in all fields."); return;
    }
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address."); return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters."); return;
    }
    if (password !== confirm) {
      setError("Passwords do not match."); return;
    }
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Registration failed."); return; }
      setSuccess("Account created! Redirecting to login...");
      setTimeout(() => router.push("/login"), 1500);
    } catch {
      setError("Something went wrong. Please try again.");
    }
  }

  const inputStyle = {
    width: "100%", padding: "10px 14px", border: "1px solid #ddd",
    borderRadius: 8, fontSize: 14, boxSizing: "border-box", fontFamily: "inherit"
  };

  return (
    <div style={{ margin: 0, fontFamily: "'Franklin Gothic Medium','Arial Narrow',Arial,sans-serif", backgroundColor: "#faf7fb", minHeight: "100vh" }}>
      <header style={{ background: "#fff", borderBottom: "1px solid #eee" }}>
        <div style={{ maxWidth: 1100, margin: "auto", display: "flex", alignItems: "center", padding: "10px 20px" }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#f07bb8", margin: 0 }}>Postify</h1>
        </div>
      </header>

      <main style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "calc(100vh - 100px)" }}>
        <div style={{ background: "#fff", borderRadius: 18, boxShadow: "0 4px 8px rgba(0,0,0,0.12)", padding: "40px 36px", width: "100%", maxWidth: 420 }}>
          <h2 style={{ color: "#d85c9d", marginBottom: 4 }}>Create account</h2>
          <p style={{ color: "#666", marginTop: 0, marginBottom: 24 }}>Join Postify and start sharing</p>

          {error && <div style={{ background: "#fde8f0", color: "#c0392b", padding: "10px 14px", borderRadius: 8, marginBottom: 16, fontSize: 14 }}>{error}</div>}
          {success && <div style={{ background: "#e8f5e9", color: "#2e7d32", padding: "10px 14px", borderRadius: 8, marginBottom: 16, fontSize: 14 }}>{success}</div>}

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", marginBottom: 6, fontWeight: 600, color: "#333" }}>Username</label>
            <input type="text" placeholder="e.g. cooluser123" value={username} onChange={e => setUsername(e.target.value)} onKeyDown={e => e.key === "Enter" && handleRegister()} style={inputStyle} />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", marginBottom: 6, fontWeight: 600, color: "#333" }}>Email</label>
            <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && handleRegister()} style={inputStyle} />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", marginBottom: 6, fontWeight: 600, color: "#333" }}>Password</label>
            <input type="password" placeholder="At least 6 characters" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && handleRegister()} style={inputStyle} />
            <span style={{ fontSize: 12, color: "#999" }}>Minimum 6 characters</span>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", marginBottom: 6, fontWeight: 600, color: "#333" }}>Confirm Password</label>
            <input type="password" placeholder="Repeat your password" value={confirm} onChange={e => setConfirm(e.target.value)} onKeyDown={e => e.key === "Enter" && handleRegister()} style={inputStyle} />
          </div>

          <button onClick={handleRegister} style={{ width: "100%", padding: 12, background: "#f07bb8", color: "#fff", border: "none", borderRadius: 999, fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
            Create Account
          </button>

          <p style={{ textAlign: "center", marginTop: 20, color: "#666", fontSize: 14 }}>
            Already have an account?{" "}
            <a href="/login" style={{ color: "#6a5acd", fontWeight: 600 }}>Log in</a>
          </p>
        </div>
      </main>

      <footer style={{ textAlign: "center", padding: 16, color: "#999", fontSize: 13 }}>&copy; 2026 Postify</footer>
    </div>
  );
}