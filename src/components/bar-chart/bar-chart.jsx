import "./bar-chart.css";
import React from "react";
import Box from "@mui/material/Box";

function BarChartComponent({ questions, groups }) {
  return (
    <div className="bar-chart">
      {groups.map((group, index) => {
        return (
          <>
            <Box className="bar-q2" sx={{ height: group.averageQ2 * 180 }} />
            <Box className="bar-q4" sx={{ height: group.averageQ4 * 180 }} />
          </>
        );
      })}
      <div className="y-axis">
        <p>0.9</p>
        <p>0.7</p>
        <p>0.5</p>
        <p>0.3</p>
        <p>0.1</p>
      </div>
      <div className="chart-key">
        <div>
          <Box className="color-box" sx={{ backgroundColor: "orange" }} />
          {questions[0] && <p className="color-title">{questions[0].text}</p>}
        </div>
        <div>
          <Box className="color-box" sx={{ backgroundColor: "green" }} />
          {questions[1] && <p className="color-title">{questions[1].text}</p>}
        </div>
      </div>
    </div>
  );
}

export default BarChartComponent;
