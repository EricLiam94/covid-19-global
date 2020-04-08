import React from "react";
import style from "./Maps.module.css";

const Card = ({ name, data, handleClick, color }) => {
  return (
    <div className={style.card}>
      <ul className={style.cardlist}>
        <div className={style.cardname}>
          Top 5 <span style={{ color: color }}>{name} </span>{" "}
        </div>
        {data.map((area, idx) => (
          <li
            key={idx}
            className={style.single}
            onClick={() => handleClick(area["Long_"], area["Lat"])}
          >
            {" "}
            <div>
              {" "}
              {area["Country_Region"]}{" "}
              <span> {area["Province_State"] || ""} </span>
            </div>
            <div style={{ color: color }}> {area[name]} </div>
          </li>
        ))}{" "}
      </ul>
    </div>
  );
};

export default Card;
