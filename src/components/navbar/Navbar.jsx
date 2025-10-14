import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate, Link } from "react-router-dom";
import { PiNotePencilLight } from "react-icons/pi";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLoginButtonClick = () => {
    navigate("/login");
  };

  const handleLogout = async () => {
    await fetch(`${import.meta.env.VITE_API_BASE}/user/logout`, {
      method: "POST",
      credentials: "include",
    });
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="MainNavHeading">
      <div className="TitleNavHeading">
        <Link to={"/"}>The News Quest</Link>
      </div>

      <div className="OptionsNavHeading">
        {user ? (
          <>
            <div className="capitalize-first-letter">
              <Link to={"/"}>{user.categoryIntrested[0]}</Link>
            </div>
            <div className="capitalize-first-letter">
              <Link to={"/"}>{user.categoryIntrested[1]}</Link>
            </div>
            <div className="capitalize-first-letter">
              <Link to={"/"}>{user.categoryIntrested[2]}</Link>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>

      <div className="AuthNavHeading">
        {user ? (
          <>
            <button
              onClick={() => navigate("/add/article")}
              className="addArticleButton"
            >
              <PiNotePencilLight
                title="Write a New Article"
                className="addArticleIcon"
              />
              Write
            </button>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <button onClick={handleLoginButtonClick}>Login/SignUp</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
