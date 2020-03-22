import React, { useState, useEffect } from "react";
import ReactMapGL, {
  Marker,
  LinearInterpolator,
  FlyToInterpolator
} from "react-map-gl";
import csv from "csvtojson";
import style from "./Maps.module.css";
import Card from "./Card";

const Maps = () => {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 2
  });
  const [type, setType] = useState("Confirmed");
  const [data, setdata] = useState([]);
  const [display, setDisplay] = useState(null);
  const getFormattedDate = () => {
    var date = new Date();
    date.setDate(date.getDate() - 2);
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : "0" + day;

    return month + "-" + day + "-" + year;
  };
  const url =
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/" +
    getFormattedDate() +
    ".csv";
  const fetchData = async () => {
    const data = await fetch(url);
    const res = await data.text();
    const out = await csv().fromString(res);
    setdata(out);
  };
  const onMouseOver = item => {
    setDisplay(item);
  };

  const onMouseOut = () => {
    setDisplay(null);
  };

  const color = {
    Confirmed: "#f39c12",
    Recovered: "#218c74",
    Deaths: "#b33939"
  };

  useEffect(() => {
    fetchData();
    return;
  }, []);

  const handleClick = (long, lat) => {
    const view = {
      ...viewport,
      longitude: parseFloat(long),
      latitude: parseFloat(lat),
      transitionDuration: 1000,
      transitionInterpolator: new FlyToInterpolator(),
      zoom: 4
    };
    setViewport(view);
  };
  const APK =
    "pk.eyJ1IjoiZXJpY2xpYW0iLCJhIjoiY2s2OTB1cTVjMGFybTNtbXJ3YjlneHhkcSJ9.m3XezVm8VJ4W-UJl4x6U7w";

  const onButtonClick = (e, type) => {
    setType(type);
  };

  return (
    <div className={style.main}>
      <div className={style.btns}>
        <div
          style={{ backgroundColor: color["Confirmed"] }}
          onClick={e => onButtonClick(e, "Confirmed")}
          className={type === "Confirmed" ? style.act : ""}
        >
          <div>Confirmed </div>
        </div>
        <div
          style={{ backgroundColor: color["Recovered"] }}
          onClick={e => onButtonClick(e, "Recovered")}
          className={type === "Recovered" ? style.act : ""}
        >
          <div>Recovered</div>
        </div>
        <div
          style={{ backgroundColor: color["Deaths"] }}
          onClick={e => onButtonClick(e, "Deaths")}
          className={type === "Deaths" ? style.act : ""}
        >
          <div>Deaths </div>
        </div>
      </div>
      <div className={style.container}>
        {display && (
          <div className={style.tooltips}>
            <div> Province/State : {display["Province/State"] || "N/A"} </div>
            <div> Country : {display["Country/Region"]} </div>
            <div> Confirmed : {display["Confirmed"]} </div>
            <div> Recovered: {display["Recovered"]} </div>
            <div> Deaths: {display["Deaths"]} </div>
          </div>
        )}
        <ReactMapGL
          {...viewport}
          onViewportChange={setViewport}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          mapboxApiAccessToken={APK}
        >
          <Markers
            data={data}
            type={type}
            color={color[type]}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
          />
        </ReactMapGL>
      </div>
      <div className={style.cards}>
        <Card
          data={data.slice(0, 5)}
          name="Confirmed"
          handleClick={handleClick}
          color={color["Confirmed"]}
        />
        <Card
          data={data
            .sort((a, b) => b["Recovered"] - a["Recovered"])
            .slice(0, 5)}
          name="Recovered"
          handleClick={handleClick}
          color={color["Recovered"]}
        />
        <Card
          data={data.sort((a, b) => b["Deaths"] - a["Deaths"]).slice(0, 5)}
          name="Deaths"
          handleClick={handleClick}
          color={color["Deaths"]}
        />
      </div>
    </div>
  );
};

const Markers = ({ data, type, onMouseOver, onMouseOut, color }) => {
  function getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
  }
  return data.map(
    (item, idx) =>
      item[type] > 0 && (
        <Marker
          key={idx}
          longitude={parseInt(item.Longitude)}
          latitude={parseInt(item.Latitude)}
        >
          <div
            className={style.circle}
            onMouseLeave={() => onMouseOut()}
            onMouseEnter={() => onMouseOver(item)}
            style={{
              width: getBaseLog(2, parseInt(item[type])),
              height: getBaseLog(2, parseInt(item[type])),
              backgroundColor: color
            }}
          >
            {" "}
          </div>
        </Marker>
      )
  );
};

export default Maps;
