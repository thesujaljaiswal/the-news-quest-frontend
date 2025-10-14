import React from "react";
import "./style.css";
import { FaRegUserCircle } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { GrLocation } from "react-icons/gr";
import { Link } from "react-router-dom";

const limitWords = (text = "", limit = 20) => {
  const words = text.split(" ");
  if (words.length <= limit) return text;
  return words.slice(0, limit).join(" ") + "...";
};

const NewsCard = ({ id, title, author, category, location, description }) => {
  return (
    <Link to={`/news/${id}`} className="newsCard">
      <div className="newsTitle">{limitWords(title, 8)}</div>
      <div className="newsDetails">
        <div className="newsAuthor">
          <FaRegUserCircle className="newsIcon" /> {author || "Unknown"}
        </div>
        <div className="newsCategory">
          <BiCategory className="newsIcon" /> {category || "General"}
        </div>
        <div className="newsLocation">
          <GrLocation className="newsIcon" /> {location || "N/A"}
        </div>
      </div>
      <div className="newsDescription">{limitWords(description, 30)}</div>
    </Link>
  );
};

export default NewsCard;
