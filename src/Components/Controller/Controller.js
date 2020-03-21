import React, { useState, useEffect } from "react";
import CSV from "csv-string";
import Charts from "../Charts/Charts";
import style from "./control.module.css";
import Maps from "../Maps/Maps";
const Controller = () => {
  const [confirmed, setconfirmed] = useState([]);
  const [recovered, setrecovered] = useState([]);
  const [deaths, setdeaths] = useState([]);
  const [dates, setdates] = useState([]);
  const [areas, setAreas] = useState([]);
  const [index, setIdx] = useState(0);

  const confirmedUrl =
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv";
  const recoveredUrl =
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Recovered.csv";
  const deathUrl =
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Deaths.csv";
  const fetchData = async (url, type) => {
    const data = await fetch(url);
    const res = await data.text();
    const out = await CSV.parse(res);
    if (type === "confirmed") {
      setdates(
        out[0].slice(4).map(date =>
          date
            .split("/")
            .slice(0, 2)
            .join("/")
        )
      );
      let temp = out.slice(1);
      setconfirmed(temp);
      let tempArea = temp.map(i => (i[0] === "" ? i[1] : i[0] + "," + i[1]));
      setAreas(tempArea);
    } else if (type === "recovered") {
      setrecovered(out.slice(1));
    } else {
      setdeaths(out.slice(1));
    }
  };
  useEffect(() => {
    fetchData(confirmedUrl, "confirmed");
    fetchData(recoveredUrl, "recovered");
    fetchData(deathUrl, "deaths");
  }, []);

  const handleClick = idx => {
    setIdx(idx);
  };

  return (
    <div>
      <div className={style.container}>
        <div className={style.arealist}>
          <ul className={style.list}>
            {areas.map((area, idx) => (
              <li key={idx} onClick={() => handleClick(idx)}>
                {area}
              </li>
            ))}{" "}
          </ul>{" "}
        </div>
        {confirmed[0] && recovered[0] && deaths[0] && (
          <Charts
            name={
              confirmed[index][0] === ""
                ? confirmed[index][1]
                : confirmed[index][0] + "," + confirmed[index][1]
            }
            dates={dates}
            confirmed={confirmed[index].slice(4)}
            recovered={recovered[index].slice(4)}
            deaths={deaths[index].slice(4)}
          />
        )}
      </div>{" "}
    </div>
  );
};

export default Controller;
