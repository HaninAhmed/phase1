"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function showError(msg) {
        setError(msg);
    }

    async function handleLogin() {
        if (email === "" || password === "") {
            showError("Please fill in all fields.");
            return;
        }

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                showError(data.error || "Login failed.");
                return;
            }

            sessionStorage.setItem("currentUser", data.username);
            sessionStorage.setItem("currentUserId", data.id);

            router.push("/home");
        } catch (err) {
            showError("Something went wrong. Please try again.");
        }
    }

    function handleKeyDown(e) {
        if (e.key === "Enter") handleLogin();
    }

    return (
        <>
            <header>
                <section className="topBar">
                    <div className="logowithtext">
                        <img src="/images/postify logo.png" alt="Postify Logo" className="logo" />
                        <h1>Postify</h1>
                    </div>
                </section>
            </header>

            <main className="authPage">
                <div className="authCard">
                    <h2>Welcome back</h2>
                    <p className="authSubtitle">Log in to your Postify account</p>

                    {error && (
                        <div className="errorMsg" style={{ display: "block" }}>
                            {error}
                        </div>
                    )}

                    <div className="authForm">
                        <div className="formGroup">
                            <label htmlFor="loginEmail">Email</label>
                            <input
                                type="email"
                                id="loginEmail"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </div>

                        <div className="formGroup">
                            <label htmlFor="loginPassword">Password</label>
                            <input
                                type="password"
                                id="loginPassword"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </div>

                        <button className="authBtn" onClick={handleLogin}>
                            Log In
                        </button>
                    </div>

                    <p className="authSwitch">
                        Don't have an account?{" "}
                        <a href="/register">Sign up</a>
                    </p>
                </div>
            </main>

            <footer>
                <p>&copy; 2026 Postify</p>
            </footer>
        </>
    );
}