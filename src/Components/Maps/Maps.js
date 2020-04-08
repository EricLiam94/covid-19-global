import React, { useState, useEffect } from "react";
import ReactMapGL, {
  Marker,
  LinearInterpolator,
  FlyToInterpolator,
} from "react-map-gl";
import csv from "csvtojson";
import style from "./Maps.module.css";
import Card from "./Card";

const Maps = () => {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: 37.7577,
    longitude: 22.4376,
    zoom: 2,
    minZoom: 1,
  });
  const [update, setUpdate] = useState("");
  const [type, setType] = useState("Recovered");
  const [data, setdata] = useState([]);
  const [display, setDisplay] = useState(null);
  const getFormattedDate = (predate) => {
    var date = new Date();
    date.setDate(date.getDate() - predate);
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : "0" + day;

    return month + "-" + day + "-" + year;
  };
  const url = (predate) =>
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/" +
    getFormattedDate(predate) +
    ".csv";

  const fetchData = async () => {
    var data = await fetch(url(1));
    setUpdate(getFormattedDate(1));
    if (data.status === 404) {
      data = await fetch(url(2));
      setUpdate(getFormattedDate(2));
    }

    const res = await data.text();
    const out = await csv().fromString(res);
    setdata(out);
  };
  const onMouseOver = (item) => {
    setDisplay(item);
  };

  const onMouseOut = () => {
    setDisplay(null);
  };

  const color = {
    Confirmed: "#f39c12",
    Recovered: "#218c74",
    Active: "#3742fa",
    Deaths: "#b33939",
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
      zoom: 4,
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
      <div className={style.update}> Last Update: {update}</div>
      <div className={style.btns}>
        <div
          style={{ backgroundColor: color["Confirmed"] }}
          onClick={(e) => onButtonClick(e, "Confirmed")}
          className={type === "Confirmed" ? style.act : ""}
        >
          <div>Confirmed </div>
        </div>
        <div
          style={{ backgroundColor: color["Recovered"] }}
          onClick={(e) => onButtonClick(e, "Recovered")}
          className={type === "Recovered" ? style.act : ""}
        >
          <div>Recovered</div>
        </div>
        <div
          style={{ backgroundColor: color["Active"] }}
          onClick={(e) => onButtonClick(e, "Active")}
          className={type === "Active" ? style.act : ""}
        >
          <div>Active </div>
        </div>
        <div
          style={{ backgroundColor: color["Deaths"] }}
          onClick={(e) => onButtonClick(e, "Deaths")}
          className={type === "Deaths" ? style.act : ""}
        >
          <div>Deaths </div>
        </div>
      </div>
      <div className={style.container}>
        {display && (
          <div className={style.tooltips}>
            <div className={style.titlename}> {display["Combined_Key"]} </div>
            <div> Confirmed : {display["Confirmed"]} </div>
            <div> Recovered: {display["Recovered"]} </div>
            <div> Active: {display["Active"]} </div>
            <div> Deaths: {display["Deaths"]} </div>
          </div>
        )}
        <ReactMapGL
          {...viewport}
          onViewportChange={setViewport}
          mapStyle="mapbox://styles/mapbox/dark-v9?optimize=true"
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
          data={data
            .sort((a, b) => b["Confirmed"] - a["Confirmed"])
            .slice(0, 5)}
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

const Markers = React.memo(({ data, type, onMouseOver, onMouseOut, color }) => {
  function getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
  }

  return data.map(
    (item, idx) =>
      item[type] > 0 &&
      Number.isFinite(parseFloat(item["Long_"])) && (
        <Marker
          key={idx}
          longitude={parseFloat(item["Long_"])}
          latitude={parseFloat(item["Lat"])}
        >
          <div
            className={style.circle}
            onMouseLeave={() => onMouseOut()}
            onMouseEnter={() => onMouseOver(item)}
            style={{
              width: getBaseLog(2, parseInt(item[type])),
              height: getBaseLog(2, parseInt(item[type])),
              backgroundColor: color,
            }}
          >
            {" "}
          </div>
        </Marker>
      )
  );
});

export default Maps;
