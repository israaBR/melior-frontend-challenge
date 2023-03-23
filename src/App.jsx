import "./App.css";
import BarChartComponent from "./components/bar-chart/bar-chart";
import DatePickersComponent from "./components/date-pickers/date-pickers";
import {
  isYearLeap,
  getNumberOfDays,
  calculateDuration,
  average,
} from "./modules/date-handler";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  let [startDate, setStartDate] = useState({ $y: "", $M: "", $D: "" });
  let [endDate, setEndDate] = useState({ $y: "", $M: "", $D: "" });
  let [duration, setDuration] = useState({ Y: "", M: "", D: "" });

  //get data from api
  let [questions, setQuestions] = useState([]);
  let [feedbacks, setFeedbacks] = useState();
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
        `https://staging.mymelior.com/v0/branches/1/progress?date_from=${startDate.$y}-${startDate.$M}-${startDate.$D}&date_to=${endDate.$y}-${endDate.$M}-${endDate.$D}`,
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

  useEffect(() => {
    get_questions();
    if (startDate.$D) {
      setDuration(calculateDuration(startDate, endDate));
      get_feedbacks();
    }
  }, [startDate, endDate]);

  //fill groups data(from, to & average)
  let [groups, setGroups] = useState([]);
  const get_choice_weight = (questionId, choiceId) => {
    for (let question of questions) {
      if (questionId == question.id) {
        for (let choice of question.choices) {
          if (choiceId == choice.id) {
            switch (choice.text) {
              case "Good":
                return 1;
              case "Neutral":
                return 0;
              case "Bad":
                return -1;
            }
            break;
          }
        }
        break;
      }
    }
  };
  const clean_groups = (dataGroups) => {
    return dataGroups.filter((group) => group.Y || group.M || group.D);
  };
  const calculate_groups_duration = (dataGroups) => {
    for (let current in dataGroups) {
      //group start date
      if (current == 0) {
        dataGroups[current].from = {
          Y: startDate.$y,
          M: startDate.$M,
          D: startDate.$D,
        };
      } else {
        dataGroups[current].from = dataGroups[current - 1].to;
      }

      //group end date
      dataGroups[current].to = {
        Y: dataGroups[current].from.Y + dataGroups[current].Y,
        M: dataGroups[current].from.M + dataGroups[current].M,
        D: dataGroups[current].from.D + dataGroups[current].D,
      };

      //end date special cases
      if (dataGroups[current].to.D > 28 && dataGroups[current].from.M == 2) {
        if (isYearLeap(dataGroups[current].from.Y)) {
          {
            dataGroups[current].to.D -= 29;
            dataGroups[current].to.M++;
          }
        } else if (!isYearLeap(dataGroups[current].from.Y)) {
          {
            dataGroups[current].to.D -= 28;
            dataGroups[current].to.M++;
          }
        }
      } else if (
        dataGroups[current].to.D > 30 &&
        dataGroups[current].from.M % 2 == 0
      ) {
        dataGroups[current].to.D -= 30;
        dataGroups[current].to.M++;
      } else if (
        dataGroups[current].to.D > 31 &&
        dataGroups[current].from.M % 2 != 0
      ) {
        dataGroups[current].to.D -= 31;
        dataGroups[current].to.M++;
      }
      if (dataGroups[current].to.M > 12) {
        dataGroups[current].to.Y++;
        dataGroups[current].to.M -= 12;
      }
    }
    return dataGroups;
  };
  const calculate_groups_average = (dataGroups) => {
    let current_group = dataGroups.length - 1,
      group_count = 0,
      group_totalQ2 = 0,
      group_totalQ4 = 0;

    let from = new Date(
      dataGroups[current_group].from.Y,
      dataGroups[current_group].from.M - 1,
      dataGroups[current_group].from.D
    );
    let to = new Date(
      dataGroups[current_group].to.Y,
      dataGroups[current_group].to.M - 1,
      dataGroups[current_group].to.D
    );
    for (let feedback of feedbacks) {
      let feedback_date = new Date(feedback.submitted_at);
      //!
      // console.log(to, feedback_date);
      if (feedback_date < from) {
        //move to next group
        if (group_count > 0) {
          dataGroups[current_group].averageQ2 = group_totalQ2 / group_count;
          dataGroups[current_group].averageQ4 = group_totalQ4 / group_count;
        }

        current_group--;
        group_totalQ2 = 0;
        group_totalQ4 = 0;
        group_count = 0;
        from = new Date(
          dataGroups[current_group].from.Y,
          dataGroups[current_group].from.M - 1,
          dataGroups[current_group].from.D
        );
        to = new Date(
          dataGroups[current_group].to.Y,
          dataGroups[current_group].to.M - 1,
          dataGroups[current_group].to.D
        );
      }

      //add selected choices to group total
      for (let answer of feedback.answers) {
        // console.log(answer);
        if (answer.question == 2)
          group_totalQ2 += get_choice_weight(answer.question, answer.choice);
        else if (answer.question == 4)
          group_totalQ4 += get_choice_weight(answer.question, answer.choice);
      }
      group_count++;
    }
    // average of final group
    if (group_count > 0) {
      dataGroups[current_group].averageQ2 = group_totalQ2 / group_count;
      dataGroups[current_group].averageQ4 = group_totalQ4 / group_count;
    }

    return dataGroups;
  };

  //split selected duration into groups based on screen size
  const split_total_duration = (numberOfGroups) => {
    let temp_duration = { Y: duration.Y, M: duration.M, D: duration.D };
    let dataGroups = [];
    for (let i = 0; i < numberOfGroups; i++)
      dataGroups.push({
        Y: 0,
        M: 0,
        D: 0,
        from: "",
        to: "",
        averageQ2: 0,
        averageQ4: 0,
      });

    if (Math.trunc(temp_duration.Y / numberOfGroups) > 0) {
      for (let i = 0; i < dataGroups.length; i++) {
        dataGroups[i].Y = Math.trunc(temp_duration.Y / numberOfGroups);
      }
    }
    //if reminder of years>0, add it to months
    if (temp_duration.Y % numberOfGroups != 0) {
      temp_duration.M = (temp_duration.Y % numberOfGroups) * 12;
    }

    if (Math.trunc(temp_duration.M / numberOfGroups) > 0) {
      for (let i = 0; i < dataGroups.length; i++) {
        dataGroups[i].M = Math.trunc(temp_duration.M / numberOfGroups);
      }
    }
    //if reminder of months>0, add it to days
    if (temp_duration.M % numberOfGroups != 0) {
      //get number of days in the reminder
      for (let i = temp_duration.M % numberOfGroups; i > 0; i--) {
        let current_month = endDate.$M - i;
        if (current_month < 1) current_month = endDate.$M - i + 12;
        temp_duration.D += getNumberOfDays(
          current_month,
          isYearLeap(endDate.$y)
        );
      }
    }

    if (Math.trunc(temp_duration.D / numberOfGroups) > 0) {
      for (let i = 0; i < dataGroups.length; i++) {
        dataGroups[i].D = Math.trunc(temp_duration.D / numberOfGroups);
      }
    }
    //if reminder of days>0, distribute it on groups
    let daysReminder = temp_duration.D % numberOfGroups;
    let i = 0;
    while (daysReminder > 0) {
      dataGroups[i].D++;
      daysReminder--;
      i++;
    }
    return dataGroups;
  };
  const prepare_data_groups = () => {
    if (feedbacks) {
      let dataGroups;
      if (window.innerWidth >= 1008) {
        //large screen
        dataGroups = split_total_duration(10);
      } else if (window.innerWidth >= 641) {
        //medium screen
        dataGroups = split_total_duration(6);
      } else {
        //small screen
        dataGroups = split_total_duration(4);
      }
      dataGroups = calculate_groups_duration(dataGroups);
      dataGroups = clean_groups(dataGroups);
      dataGroups = calculate_groups_average(dataGroups);
      setGroups(dataGroups);
    }
  };

  useEffect(() => {
    console.log("duration", duration);
  }, [duration]);

  //!
  useEffect(() => {
    console.log("groups", groups);
  }, [groups]);
  useEffect(() => {
    console.log("feedbacks", feedbacks);
    prepare_data_groups();
  }, [feedbacks]);

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
            groups={groups}
          ></BarChartComponent>
        </div>
      </section>
    </>
  );
}

export default App;
