import { DatePicker } from "@mui/x-date-pickers";
import React, { useState, useEffect } from "react";
import "./date-pickers.css";

function DatePickersComponent({ setStartDate, setEndDate }) {
  //change and validate date values
  let [start, setStart] = useState({ $y: "", $M: "", $D: "" });
  let [end, setEnd] = useState({ $y: "", $M: "", $D: "" });
  let [user_msg, setUser_msg] = useState({
    text: "Please Select Start and End Dates To View Insights",
    type: "war-msg",
  });

  useEffect(() => {
    validate_dates();
  }, [start, end]);

  const validate_dates = () => {
    //start & end dates are both selected
    if (!start.$y || !end.$y)
      setUser_msg({
        text: "Please Select Start and End Dates To View Insights",
        type: "war-msg",
      });
    else {
      setUser_msg({ text: "", type: "none" });
      //end date is after start date
      let endBeforeStart = false;
      if (start.$y > end.$y) endBeforeStart = true;
      else if (start.$y == end.$y) {
        if (start.$M > end.$M) endBeforeStart = true;
        else if (start.$M == end.$M && start.$D > end.$D) endBeforeStart = true;
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
      if (end.$y > current_date.getFullYear()) endDateInFuture = true;
      else if (end.$y == current_date.getFullYear()) {
        if (end.$M > current_date.getMonth()) endDateInFuture = true;
        else if (
          end.$M == current_date.getMonth() &&
          end.$D > current_date.getDate()
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
      if (start.$y > current_date.getFullYear()) startDateInFuture = true;
      else if (start.$y == current_date.getFullYear()) {
        if (start.$M > current_date.getMonth()) startDateInFuture = true;
        else if (
          start.$M == current_date.getMonth() &&
          start.$D > current_date.getDate()
        )
          startDateInFuture = true;
      }
      if (startDateInFuture) {
        setUser_msg({
          text: "Start date can't be in the future, please select a valid date.",
          type: "err-msg",
        });
      }

      //if date are valid, sed them to app component
      if (!endBeforeStart && !endDateInFuture && !startDateInFuture) {
        setStartDate(start);
        setEndDate(end);
      }
    }
  };

  return (
    <div className="date-pickers">
      <DatePicker
        label="Start Date"
        className="date-picker"
        onChange={({ $y, $M, $D }) => {
          setStart({ $y, $M, $D });
        }}
      />
      <DatePicker
        label="End Date"
        className="date-picker"
        onChange={({ $y, $M, $D }) => {
          setEnd({ $y, $M, $D });
        }}
      />
      {user_msg.text && <p className={user_msg.type}>{user_msg.text}</p>}
    </div>
  );
}

export default DatePickersComponent;
