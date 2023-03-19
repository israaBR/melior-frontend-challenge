import "./bar-chart.css";
import React, { useState } from "react";
import Box from "@mui/material/Box";

function BarChartComponent({ questions, y_axis, x_axis }) {
  return (
    <div className="bar-chart">
      {/* <Box className="bar-q2" sx={{ height: 240 }} />
      <Box className="bar-q4" sx={{ height: 120 }} />
      <Box className="bar-q2" sx={{ height: 100 }} />
      <Box className="bar-q4" sx={{ height: 150 }} />
      <Box className="bar-q2" sx={{ height: 150 }} />
      <Box className="bar-q4" sx={{ height: 120 }} />
      <Box className="bar-q2" sx={{ height: 150 }} />
      <Box className="bar-q4" sx={{ height: 120 }} />
      <Box className="bar-q2" sx={{ height: 140 }} />
      <Box className="bar-q4" sx={{ height: 120 }} />
      <Box className="bar-q2" sx={{ height: 150 }} />
      <Box className="bar-q4" sx={{ height: 120 }} />
      <Box className="bar-q2" sx={{ height: 120 }} />
      <Box className="bar-q4" sx={{ height: 150 }} />
      <Box className="bar-q2" sx={{ height: 150 }} />
      <Box className="bar-q4" sx={{ height: 120 }} />
      <Box className="bar-q2" sx={{ height: 150 }} />
      <Box className="bar-q4" sx={{ height: 120 }} />
      <Box className="bar-q2" sx={{ height: 130 }} />
      <Box className="bar-q4" sx={{ height: 100 }} /> */}
      <div className="chart-key">
        <div>
          <Box className="color-box" sx={{ backgroundColor: "indianred;" }} />
          {questions[0] && <p className="color-title">{questions[0].text}</p>}
        </div>
        <div>
          <Box className="color-box" sx={{ backgroundColor: "indigo" }} />
          {questions[1] && <p className="color-title">{questions[1].text}</p>}
        </div>
      </div>
    </div>
  );
}

export default BarChartComponent;
