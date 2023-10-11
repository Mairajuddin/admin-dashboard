import React, { useState } from "react";
import Chart from "react-apexcharts";
// import '../Styles/Components/BarChart.css';

const BarChart = () => {
  const [options, setOptions] = useState({
    chart: {
      id: "basic-bar"
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
    }
  });

  const [series, setSeries] = useState([
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91]
    }
  ]);

  return (
    <div >
      <div className="row">
        <div className="mixed-chart">
          <Chart options={options} series={series} type="bar"  height='300px' />
        </div>
      </div>
    </div>
  );
};

export default BarChart;