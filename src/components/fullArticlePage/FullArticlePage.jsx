import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./style.css"; // Import the CSS file
import { FaRegUserCircle } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { GrLocation } from "react-icons/gr";
import { MdOutlineDateRange } from "react-icons/md";

const FullArticlePage = () => {
  const { id } = useParams(); // get the article ID from route
  const [news, setNews] = useState(null);
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE}/news/read/${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch article");

        const result = await res.json();
        setNews(result?.data?.getdetailedNewsObject || null);
        setAuthor(result?.data?.getAuthorDetails || null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!news) return <div className="no-article">No article found.</div>;

  const formattedDateTime = new Date(news.createdAt).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="article-container">
      <h1 className="article-title">{news.title}</h1>

      <div className="article-meta">
        <p>
          <FaRegUserCircle className="newsIcon" />{" "}
          {author?.fullName || "Unknown"}
        </p>
        <p>
          <BiCategory className="newsIcon" /> {news.category || "General"}
        </p>

        <p>
          <MdOutlineDateRange className="newsIcon" />
          {formattedDateTime}
        </p>
      </div>

      <p className="article-description">
        <strong>
          <span>{author?.location?.country_name}:</span>
        </strong>{" "}
        {news.description}
      </p>
    </div>
  );
};

export default FullArticlePage;
