import "./App.css";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import BarChartComponent from "./components/bar-chart/bar-chart";
import DatePickersComponent from "./components/date-pickers/date-pickers";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  // let [duration, setDuration] = useState({ Y: "", M: "", D: "" });
  let [startDate, setStartDate] = useState({ $y: "", $M: "", $D: "" });
  let [endDate, setEndDate] = useState({ $y: "", $M: "", $D: "" });

  // const calculate_duration = () => {
  //   return {
  //     Y: endDate.$y - startDate.$y,
  //     M: endDate.$M - startDate.$M,
  //     D: endDate.$D - startDate.$D,
  //   };
  // };

  //get data from api
  let [questions, setQuestions] = useState([]);
  let [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    get_questions();
    get_feedbacks();
  }, [startDate, endDate]);

  const AUTH_TOKEN = "Bearer SLSmxK17vjRInEWIiFQjwE1QIDfeSM";
  const get_questions = () => {
    axios
      .get("https://staging.mymelior.com/v1/questions", {
        headers: { Authorization: AUTH_TOKEN },
      })
      .then((result) => {
        setQuestions([
          result.data[0].questions[1],
          result.data[0].questions[3],
        ]);
      })
      .catch((error) => {
        // setUser_msg({
        //   text: "Sorry, a problem happened while getting the data. Try Again Later.",
        //   type: "war-msg",
        // });
        console.log(error);
      });
  };
  const get_feedbacks = () => {
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
        setFeedbacks(result.data.line_chart_data);
      })
      .catch((error) => {
        // setUser_msg({
        //   text: "Sorry, a problem happened while getting the data. Try Again Later.",
        //   type: "war-msg",
        // });
        console.log(error);
      });
  };
  ///////////////////////////////////////////////////////////////////////

  // let [dataGroups, setDataGroups] = useState();
  // let [dataAverage, setDataAverage] = useState([]);

  // //TODO: split data into periods based on screen size

  // //! Some Years have 365 days and others have 366
  // //! Some months have 31 days, others have 30 days and others have 29/28 days
  // const split_feedbacks = () => {
  //   if (duration.D != "") {
  //     if (window.screen.width >= 1008) {
  //       //TODO: large screen
  //       //?years == 0, then do nothing
  //       //?years  %10 != 0, then convert years to months
  //       //?years %10 == 0, then divides them by 10
  //       ////Leap Year is divisible by 4
  //       //?months == 0, then do nothing
  //       //?months  %10 != 0, then convert months to days
  //       //?months %10 == 0, then divides them by 10
  //       ////even months are 30 days and odd are 31
  //       //?days == 0, then do nothing
  //       //!days  %10 != 0, then ..
  //       //?days %10 == 0, then divides them by 10
  //       // use modlus
  //       // if(duration.Y % 10 !=0){
  //       // }
  //     } else if (window.screen.width >= 641) {
  //       //TODO: medium screem
  //     } else {
  //       //TODO: small screen
  //     }
  //   }
  // };
  // //TODO calculate average of feedbacks for each period
  // //TODO represent points on y-axis
  // //TODO: respresent averages on bars

  ///////////////////////////////////////////////////////////////////////

  return (
    <>
      <header>
        <h1>Melior Frontend Challenge</h1>
      </header>
      <section>
        <div className="date-container">
          <DatePickersComponent
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          ></DatePickersComponent>
        </div>
        <div className="chart-container">
          <BarChartComponent
            questions={questions}
            y_axis={[]}
            x_axis={[]}
          ></BarChartComponent>
        </div>
      </section>
    </>
  );
}

export default App;
