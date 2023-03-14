import "./bar-chart.css";
import React from "react";
import Box from "@mui/material/Box";

function BarChartComponent() {
  return (
    <div className="bar-chart">
      <Box className="bar-q2" sx={{ height: 150 }} />
      <Box className="bar-q4" sx={{ height: 120 }} />
      <Box className="bar-q2" sx={{ height: 100 }} />
      <Box className="bar-q4" sx={{ height: 140 }} />
      <Box className="bar-q2" sx={{ height: 150 }} />
      <Box className="bar-q4" sx={{ height: 120 }} />
      <Box className="bar-q2" sx={{ height: 150 }} />
      <Box className="bar-q4" sx={{ height: 120 }} />
      <Box className="bar-q2" sx={{ height: 150 }} />
      <Box className="bar-q4" sx={{ height: 120 }} />
      <Box className="bar-q2" sx={{ height: 150 }} />
      <Box className="bar-q4" sx={{ height: 120 }} />
      <Box className="bar-q2" sx={{ height: 120 }} />
      <Box className="bar-q4" sx={{ height: 150 }} />
      <Box className="bar-q2" sx={{ height: 150 }} />
      <Box className="bar-q4" sx={{ height: 120 }} />
      <Box className="bar-q2" sx={{ height: 80 }} />
      <Box className="bar-q4" sx={{ height: 120 }} />
      <Box className="bar-q2" sx={{ height: 130 }} />
      <Box className="bar-q4" sx={{ height: 100 }} />
      <div className="chart-key">
        <div>
          <Box className="color-box" sx={{ backgroundColor: "brown" }} />
          <p className="color-title">Reception and admission were</p>
        </div>
        <div>
          <Box className="color-box" sx={{ backgroundColor: "blue" }} />
          <p className="color-title">The medical care you received was</p>
        </div>
      </div>
    </div>
  );
}

export default BarChartComponent;
