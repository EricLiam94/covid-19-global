import React, { useState, useEffect, useReducer } from "react";
import CSV from "csv-string";
import Charts from "../Charts/Charts";
import style from "./control.module.css";

const initialState = {
  loading: false,
  confirmed: [],
  deaths: [],
  dates: [],
  areas: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setConfirmed":
      return { ...state, confirmed: action.payload };
    case "setDeaths":
      return { ...state, deaths: action.payload };
    case "setDates":
      return { ...state, dates: action.payload };
    case "setArea":
      return { ...state, areas: action.payload };
    case "setLoading":
      return { ...state, loading: true };
    case "finishLoading":
      return { ...state, loading: false };
    default:
      return state;
  }
};

const Controller = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [index, setIdx] = useState(0);
  const [search, setSearch] = useState("");
  const confirmedUrl =
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";
  const deathUrl =
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv";
  const fetchData = async (url, type) => {
    const data = await fetch(url);
    const res = await data.text();
    const out = await CSV.parse(res);
    if (type === "confirmed") {
      dispatch({ type: "setLoading" });
      dispatch({
        type: "setDates",
        payload: out[0]
          .slice(4)
          .map((date) => date.split("/").slice(0, 2).join("/")),
      });
      let temp = out.slice(1);
      dispatch({ type: "setConfirmed", payload: temp });
      let tempArea = temp.map((i, idx) => ({
        area: i[0] === "" ? i[1] : i[0] + "," + i[1],
        idx: idx,
      }));
      dispatch({ type: "setArea", payload: tempArea });
    } else {
      dispatch({ type: "setDeaths", payload: out.slice(1) });
    }
    dispatch({ type: "finishLoading" });
  };
  useEffect(() => {
    fetchData(confirmedUrl, "confirmed");
    fetchData(deathUrl, "deaths");
  }, []);

  const handleClick = (idx) => {
    setIdx(idx);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <div className={style.container}>
        <div className={style.arealist}>
          <input
            type="text"
            placeholder="Seach here"
            value={search}
            onChange={handleChange}
          />
          <ul className={style.list}>
            {state.areas
              .filter((item) =>
                item.area.toUpperCase().includes(search.toUpperCase())
              )
              .map((area, idx) => (
                <li key={area.idx} onClick={() => handleClick(area.idx)}>
                  {area.area}
                </li>
              ))}{" "}
          </ul>{" "}
        </div>
        {state.confirmed[0] && state.deaths[0] && (
          <Charts
            name={
              state.confirmed[index][0] === ""
                ? state.confirmed[index][1]
                : state.confirmed[index][0] + "," + state.confirmed[index][1]
            }
            dates={state.dates}
            confirmed={state.confirmed[index].slice(4)}
            deaths={state.deaths[index].slice(4)}
          />
        )}
      </div>{" "}
    </div>
  );
};

export default Controller;
