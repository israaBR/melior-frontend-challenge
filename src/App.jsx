import "./App.css";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import BarChartComponent from "./bar-chart/bar-chart";
import { useState } from "react";

function App() {
  return (
    <>
      <header>
        <h1>Melior Frontend Challenge</h1>
      </header>
      <section>
        <div className="date-container">
          <DatePicker label="Start Date" className="date-picker" />
          <DatePicker label="End Date" className="date-picker" />
        </div>
        <div className="chart-container">
          <BarChartComponent></BarChartComponent>
        </div>
      </section>
    </>
  );
}

export default App;
