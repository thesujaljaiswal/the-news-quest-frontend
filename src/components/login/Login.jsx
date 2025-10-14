// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getLocation = async () => {
    // IP-based fallback (approximate)
    try {
      const res = await fetch("https://ipapi.co/json/");
      if (!res.ok) throw new Error("IP lookup failed");
      const ipData = await res.json();
      return { source: "ip", ...ipData };
    } catch (err) {
      return { source: "none" };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    try {
      const locationData = await getLocation();

      const res = await fetch(`${import.meta.env.VITE_API_BASE}/user/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, location: locationData }),
      });

      const resJson = await res.json();

      if (!res.ok) {
        const message = resJson?.message || resJson?.error || "Login failed";
        setErr(message);
        setLoading(false);
        return;
      }

      const user = resJson?.data?.user;
      if (!user) {
        setErr("Login succeeded but server didn't return user info.");
        setLoading(false);
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      setErr("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Login</h2>
        {err && <div className="form-error">{err}</div>}
        <input
          className="form-input"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoComplete="username"
        />
        <input
          className="form-input"
          name="password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
        <button className="form-btn" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <Link className="signup-link" to={"/register"}>
          New user? Signup
        </Link>
      </form>
    </>
  );
}
