import React from "react";
import Maps from "./Components/Maps/Maps";
import "./App.css";
import Chart from "react-apexcharts";

function App() {
  var options = {
    title: {
      text: "check",
      floating: true,
      margin: 10,
      style: { color: "white" }
    },
    chart: {
      id: "basic-bar"
    },
    stroke: {
      curve: "smooth"
    },
    xaxis: {
      categories: ["a", "b", "c", "d", 1995, 1996, 1997, 1998, 1999],
      rotate: -45,
      rotateAlways: true,
      labels: {
        show: true,
        align: "right",
        minWidth: 0,
        maxWidth: 160,
        style: { colors: "white" }
      }
    },
    fill: {
      type: "gradient"
    },
    yaxis: {
      labels: { style: { colors: "white" } }
    },
    legend: {
      labels: {
        colors: "white"
      }
    }
  };
  var series = [
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91]
    },
    {
      name: "series-2",
      data: [50, 10, 25, 30, 49, 60, 70, 91]
    },
    {
      name: "series-3",
      data: [50, 10, 25, 30, 149, 61, 170, 291]
    }
  ];

  return (
    <div className="App">
      <header className="App-header">
        <h3> Global Covid-19 </h3>
        <Maps />
        <Chart
          style={{ color: "black" }}
          options={options}
          series={series}
          type="area"
          width="600px"
        />
      </header>
    </div>
  );
}

export default App;
