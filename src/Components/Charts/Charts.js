import React, { useEffect } from "react";
import Chart from "react-apexcharts";

const Charts = ({ name, dates, confirmed, recovered, deaths }) => {
  var options = {
    title: {
      text: name,
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
      categories: dates,
      show: true,
      rotate: 45,
      rotateAlways: true,
      minHeight: 100,
      maxHeight: 180,
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
    },
    dataLabels: {
      enabled: false
    }
  };
  var series = [
    {
      name: "Confirmed",
      data: confirmed
    },
    { name: "Recovered", data: recovered },
    { name: "Deaths", data: deaths }
  ];
  return (
    <div>
      {name && (
        <Chart
          style={{ color: "black" }}
          options={options}
          series={series}
          type="area"
          width="800px"
        />
      )}
    </div>
  );
};

export default Charts;
