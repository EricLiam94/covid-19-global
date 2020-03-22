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
            onClick={() => handleClick(area["Longitude"], area["Latitude"])}
          >
            {" "}
            <div>
              {" "}
              {area["Country/Region"]}{" "}
              <span> {area["Province/State"] || ""} </span>
            </div>
            <div style={{ color: color }}> {area[name]} </div>
          </li>
        ))}{" "}
      </ul>
    </div>
  );
};
export default Card;
