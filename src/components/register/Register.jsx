import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar.jsx";
import "./style.css";

export default function SignupForm() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    fullName: "",
    categoryIntrested: [],
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const categories = [
    "Politics",
    "Business",
    "Science & Technology",
    "Sports",
    "Entertainment",
    "Health",
    "Education",
    "International",
    "Local",
    "Law & Order",
    "Environment",
    "Opinion",
  ];

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleCategorySelect = (category) => {
    setUser((prev) => {
      let updatedCategories = [...prev.categoryIntrested];

      if (updatedCategories.includes(category)) {
        updatedCategories = updatedCategories.filter((c) => c !== category);
      } else {
        if (updatedCategories.length >= 3) {
          alert("You can select up to 3 categories only!");
          return prev;
        }
        updatedCategories.push(category);
      }

      return { ...prev, categoryIntrested: updatedCategories };
    });
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const getLocation = async () => {
    try {
      const res = await fetch("https://ipapi.co/json/");
      if (!res.ok) throw new Error("IP lookup failed");
      const ipData = await res.json();
      return { source: "ip", ...ipData };
    } catch (err) {
      console.warn("IP lookup failed:", err.message);
      return { source: "none" };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const locationData = await getLocation();

      const payload = {
        ...user,
        categoryIntrested: user.categoryIntrested.join(", "),
        location: locationData,
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE}/user/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || data.message || "Signup failed");
        setLoading(false);
        return;
      }

      alert(data.message || "Signup successful");
      navigate("/");
    } catch (error) {
      console.error("Submit error:", error);
      alert("An error occurred. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Signup</h2>

        <div className="form-group">
          <label className="form-label">Username</label>
          <input
            className="form-input"
            name="username"
            placeholder="Username"
            onChange={handleInput}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            className="form-input"
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleInput}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Full name</label>
          <input
            className="form-input"
            name="fullName"
            placeholder="Full Name"
            onChange={handleInput}
            required
          />
        </div>

        {/* ✅ Simple dropdown with checkbox-like selection */}
        <div className="form-group">
          <label className="form-label">Categories Interested (max 3)</label>
          <div className="dropdown-container">
            <div className="dropdown-selected" onClick={toggleDropdown}>
              {user.categoryIntrested.length > 0
                ? user.categoryIntrested.join(", ")
                : "Select categories"}
              <span className="arrow">{dropdownOpen ? "▲" : "▼"}</span>
            </div>

            {dropdownOpen && (
              <div className="dropdown-menu">
                {categories.map((cat) => (
                  <div
                    key={cat}
                    className={`dropdown-item ${
                      user.categoryIntrested.includes(cat) ? "selected" : ""
                    }`}
                    onClick={() => handleCategorySelect(cat)}
                  >
                    {cat}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            className="form-input"
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleInput}
            required
          />
        </div>

        <button className="form-btn" type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Sign up"}
        </button>

        <Link className="login-link" to={"/login"}>
          Already a user? Login
        </Link>
      </form>
    </>
  );
}
