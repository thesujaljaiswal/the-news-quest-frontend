import React from "react";
import Navbar from "../components/navbar/Navbar.jsx";
import HeroBanner from "../components/heroBanner/HeroBanner.jsx";
import NewsList from "../components/newsList/NewsList.jsx";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      {/* Uncomment the below component when conpletely ready. For Now focus on MVP */}
      {/* <HeroBanner /> */}
      <NewsList />
    </>
  );
};

export default LandingPage;
