import "./App.css";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import BarChartComponent from "./bar-chart/bar-chart";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  //!change and validate date values
  let [startDate, setStartDate] = useState({ $y: "", $M: "", $D: "" });
  let [endDate, setEndDate] = useState({ $y: "", $M: "", $D: "" });
  let [user_msg, setUser_msg] = useState({
    text: "Please Select Start and End Dates To View Insights",
    type: "war-msg",
  });

  const validate_dates = () => {
    //start & end dates are both selected
    if (!startDate.$y || !endDate.$y)
      setUser_msg({
        text: "Please Select Start and End Dates To View Insights",
        type: "war-msg",
      });
    else {
      setUser_msg({ text: "", type: "none" });
      //end date is after start date
      let endBeforeStart = false;
      if (startDate.$y > endDate.$y) endBeforeStart = true;
      else if (startDate.$y == endDate.$y) {
        if (startDate.$M > endDate.$M) endBeforeStart = true;
        else if (startDate.$M == endDate.$M && startDate.$D > endDate.$D)
          endBeforeStart = true;
      }
      if (endBeforeStart) {
        setUser_msg({
          text: "End date Can't be before start date, please select a valid date.",
          type: "err-msg",
        });
      }

      //end date is not in the future
      let current_date = new Date();
      let endDateInFuture = false;
      if (endDate.$y > current_date.getFullYear()) endDateInFuture = true;
      else if (endDate.$y == current_date.getFullYear()) {
        if (endDate.$M > current_date.getMonth()) endDateInFuture = true;
        else if (
          endDate.$M == current_date.getMonth() &&
          endDate.$D > current_date.getUTCDate()
        )
          endDateInFuture = true;
      }
      if (endDateInFuture) {
        setUser_msg({
          text: "End date can't be in the future, please select a valid date.",
          type: "err-msg",
        });
      }

      //start dates is not in the future
      let startDateInFuture = false;
      if (startDate.$y > current_date.getFullYear()) startDateInFuture = true;
      else if (startDate.$y == current_date.getFullYear()) {
        if (startDate.$M > current_date.getMonth()) startDateInFuture = true;
        else if (
          startDate.$M == current_date.getMonth() &&
          startDate.$D > current_date.getUTCDate()
        )
          startDateInFuture = true;
      }
      if (startDateInFuture) {
        setUser_msg({
          text: "Start date can't be in the future, please select a valid date.",
          type: "err-msg",
        });
      }

      //if date are valid, get data
      if (!endBeforeStart && !endDateInFuture && !startDateInFuture) {
        get_questions();
        get_answers();
      }
    }
  };

  useEffect(() => {
    validate_dates();
  }, [startDate, endDate]);

  //!get data from api
  const AUTH_TOKEN = "Bearer SLSmxK17vjRInEWIiFQjwE1QIDfeSM";

  const get_questions = () => {
    axios
      .get("https://staging.mymelior.com/v1/questions", {
        headers: { Authorization: AUTH_TOKEN },
      })
      .then((result) => {
        //TODO: HANDLE API DATA
        console.log(result.data);
      })
      .catch((error) => {
        setUser_msg({
          text: "Sorry, a problem happened while getting the data. Try Again Later.",
          type: "war-msg",
        });
        console.log(error);
      });
  };
  const get_answers = () => {
    axios
      .get(
        `https://staging.mymelior.com/v0/branches/1/progress?date_from=${
          startDate.$y
        }-${startDate.$M + 1}-${startDate.$D}&date_to=${endDate.$y}-${
          endDate.$M + 1
        }-${endDate.$D}`,
        {
          headers: { Authorization: AUTH_TOKEN },
        }
      )
      .then((result) => {
        //TODO: HANDLE API DATA
        console.log(result.data);
      })
      .catch((error) => {
        setUser_msg(
          "Sorry, a problem happened while getting the data. Try Again Later."
        );
        console.log(error);
      });
  };

  return (
    <>
      <header>
        <h1>Melior Frontend Challenge</h1>
      </header>
      <section>
        <div className="date-container">
          <DatePicker
            label="Start Date"
            className="date-picker"
            onChange={({ $y, $M, $D }) => {
              // setDates({ ...dates, start: [$y, $M, $D] });
              setStartDate({ $y, $M, $D });
            }}
          />
          <DatePicker
            label="End Date"
            className="date-picker"
            onChange={({ $y, $M, $D }) => {
              // setDates({ ...dates, end: [$y, $M, $D] });
              setEndDate({ $y, $M, $D });
            }}
          />
          {user_msg.text && <p className={user_msg.type}>{user_msg.text}</p>}
        </div>
        <div className="chart-container">
          <BarChartComponent></BarChartComponent>
        </div>
      </section>
    </>
  );
}

export default App;
