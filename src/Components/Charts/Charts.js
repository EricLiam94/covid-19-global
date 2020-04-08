import React from "react";
import Chart from "react-apexcharts";

const Charts = ({ name, dates, confirmed, deaths }) => {
  var options = {
    title: {
      text: name,

      margin: 10,
      style: { color: "white" }
    },
    subtitle: {
      text: "Confirmed and Deaths charts",
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
