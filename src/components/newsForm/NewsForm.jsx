import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

export default function NewsForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [success, setSuccess] = useState(null);

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      alert("Please login first!");
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    setSuccess(null);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE}/news/submitnews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
          credentials: "include", // ✅ send cookies with request
        }
      );
      console.log(res);

      const data = await res.json();

      if (!res.ok) {
        setErr(data.message || "Error submitting article");
        return;
      }

      setSuccess("Article submitted successfully!");
      setForm({ title: "", description: "", category: "" });
      navigate("/"); // redirect after success
    } catch (error) {
      console.error(error);
      setErr("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="news-form" onSubmit={handleSubmit}>
      <h2 className="form-title">News Article Creation</h2>
      {err && <div className="form-error">{err}</div>}
      {success && <div className="form-success">{success}</div>}

      <div className="form-group">
        <label className="form-label">Title</label>
        <input
          className="form-input"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          placeholder="Enter the title"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea
          className="form-input"
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          placeholder="Enter the article description"
          rows={5}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Category</label>
        <select
          className="form-input"
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">Select a category</option>
          <option value="Politics">Politics</option>
          <option value="Business">Business</option>
          <option value="Science & Technology">Science & Technology</option>
          <option value="Sports">Sports</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Health">Health</option>
          <option value="Education">Education</option>
          <option value="International">International</option>
          <option value="Local">Community</option>
          <option value="Law & Order">Law & Order</option>
          <option value="Environment">Environment</option>
          <option value="Opinion">Opinion</option>
        </select>
      </div>

      <button className="form-btn" type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Article"}
      </button>
    </form>
  );
}
