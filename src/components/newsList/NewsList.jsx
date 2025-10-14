import React, { useEffect, useState } from "react";
import NewsCard from "../newsCard/NewsCard.jsx";
import "./style.css";

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchNews = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE}/news/getnews`
        );

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(
            errData.error || errData.message || "Failed to fetch news"
          );
        }

        const result = await response.json();

        // Extract news array from ApiResponse
        const newsArray = Array.isArray(result.data)
          ? result.data
          : Array.isArray(result.articles)
          ? result.articles
          : Array.isArray(result)
          ? result
          : [];

        if (!mounted) return;
        setNews(newsArray);
      } catch (err) {
        if (!mounted) return;
        console.error("fetchNews error:", err);
        setError(err.message || "Failed to fetch news");
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };

    fetchNews();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <div className="loading">Loading news...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!news.length) return <div className="no-news">No news available.</div>;

  return (
    <div className="newsList">
      {news.map((item, idx) => (
        <NewsCard
          key={item._id ?? item.id ?? idx}
          id={item._id ?? item.id}
          title={item.title}
          author={item.author?.fullName ?? "Unknown"} // safe string
          category={item.category}
          location={item.author?.location?.country_name ?? ""}
          description={item.description}
        />
      ))}
    </div>
  );
};

export default NewsList;
