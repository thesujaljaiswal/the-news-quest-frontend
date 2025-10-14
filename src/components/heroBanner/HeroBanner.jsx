import React from "react";
import tnqbackgroundimg from "../../assets/tnqbackground.png";
import "./style.css";

const HeroBanner = () => {
  return (
    <>
      <div className="HeroBannerMain">
        <div className="HeroBannerContent">
          <div>Unbiased. Unfiltered. Unstoppable.</div>
        </div>
        <div className="HeroBannerImage">
          <img src={tnqbackgroundimg} alt="sample newspaper demonstration" />
        </div>
      </div>
    </>
  );
};

export default HeroBanner;
