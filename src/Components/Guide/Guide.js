import React from "react";
import YouTube from "react-youtube";
import style from "./Guide.module.css";

const Guide = () => {
  const opts = {
    height: "480",
    width: "840",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className={style.main}>
      <h3> How to protect yourself </h3>
      <div className={style.imgs}>
        <div>
          <img
            className={style.image}
            src="https://www.cdc.gov/coronavirus/2019-ncov/images/protect-wash-hands.png"
            alt="error"
            width="180px"
          />
          <p className={style.way}>Clean your hands often </p>
        </div>
        <div>
          <img
            className={style.image}
            src="https://www.cdc.gov/coronavirus/2019-ncov/images/protect-quarantine.png"
            alt="error"
            width="180px"
          />
          <p className={style.way}> Avoid close contact </p>
        </div>
        <div>
          <img
            className={style.image}
            src="https://www.cdc.gov/coronavirus/2019-ncov/images/COVIDweb_05_mask.png"
            alt="error"
            width="180px"
          />
          <p className={style.way}> Wear a facemask </p>
        </div>
      </div>
      <YouTube videoId="bPITHEiFWLc" opts={opts} />
    </div>
  );
};

export default Guide;
