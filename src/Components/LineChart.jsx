import React, { useEffect } from "react";
import Chart from "react-apexcharts";

const LineChart = ({ id }) => {
  console.log(id, "id");
  useEffect(() => {
    const options = {
      chart: {
        redrawOnParentResize: true,
        width: 150,
        height: 120,
        type: "line",
        stacked: false,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      grid: {
        show: false, // you can either change hear to disable all grids
        xaxis: {
          lines: {
            show: false, //or just here to disable only x axis grids
          },
        },
      },
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      xaxis: {
        show: false,
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },
      },
      
      yaxis: {
        show: false,
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },
      },

      colors: ["#FF1654", "#247BA0"],
      series: [
        {
          name: "Series A",
          data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6],
        },
      ],
      stroke: {
        width: [2, 2],
      },
    };

    const chart = new ApexCharts(document.querySelector(`#${id}`), options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, []);

  return <div id={id}></div>;
};

export default LineChart;
