import React, { useState } from "react";
import Chart from "react-apexcharts";

const PieChart = () => {
  const [options, setOptions] = useState({
    
    chart: 
    {
      id: "basic-pie",
      type:"pie",
       height: '100%',
      redrawOnParentResize: true
      
    },
    chartOptions: {
      labels: ['Apple', 'Mango', 'Orange', 'Watermelon']
    }
    ,
    plotOptions: {
      pie: {
        donut: {
          size: '60%',
          labels: {
            show: true,
            total: {
              showAlways: true
            }            
          }
        }
      }
    }
  });

  const [series, setSeries] = useState([44, 55, 41, 17, 15]
    );

  return (
    <div >
      <div className="row">
        <div className="mixed-chart d-flex" >
          <Chart options={options} series={series} type="donut"  height='300px'/>
        </div>
      </div>
    </div>
  );
};

export default PieChart;
