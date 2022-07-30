import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { calculatePercentage } from "./utils/calculatePercentage";

const TOKEN = `2444011b-7b70-4608-aa17-bdfb67359553`;
const studentURL = `https://crystal-pepsi.herokuapp.com/students`;

const axiosConfig = {
  headers: {
    Authorization: TOKEN,
  },
};

type dayOfWeek = "regular_day" | "short_day";
type tag = "instructional" | "lunch" | "pe" | "core";
export interface IClass {
  id: number;
  period: number;
  daysOfWeek: dayOfWeek[];
  duration: number;
  name: string;
  tags: tag[];
}

function App() {
  const [students, setStudents] = useState<string[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  const [schedule, setSchedule] = useState<IClass[]>([]);
  const [timeInMeetings, setTimeInMeetings] = useState<number>();
  const [reportedStudent, setReportedStudent] = useState("");

  const meetingsURL = `https://crystal-pepsi.herokuapp.com/students/${selectedStudent}/meetings`;

  const getSchedule = () => {
    axios
      .get(meetingsURL, axiosConfig)
      .then((res) => setSchedule(res.data))
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          console.log("error message: ", error.message);
          return error.message;
        } else {
          console.log("unexpected error: ", error);
          return "An unexpected error occurred";
        }
      });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getSchedule();
  };

  useEffect(() => {
    setTimeInMeetings(calculatePercentage(schedule));
    setReportedStudent(selectedStudent);
  }, [schedule]);

  useEffect(() => {
    axios
      .get(studentURL, axiosConfig)
      .then((res) => {
        setStudents(res.data);
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          console.log("error message: ", error.message);
          // 👇️ error: AxiosError<any, any>
          return error.message;
        } else {
          console.log("unexpected error: ", error);
          return "An unexpected error occurred";
        }
      });
  }, []);

  useEffect(() => setSelectedStudent(students[0]), [students]);

  return (
    <div className="App">
      <form onSubmit={(e) => handleSubmit(e)}>
        <select
          defaultValue={selectedStudent ?? ""}
          onChange={(event) => {
            setSelectedStudent(event.target.value);
          }}
        >
          {students.map((student, index) => (
            <option key={index} value={student}>
              {student}
            </option>
          ))}
        </select>
        <button type="submit">Submit</button>
      </form>
      <div className="schedule">
        <p>
          {reportedStudent && timeInMeetings !== undefined
            ? `${reportedStudent} spends ${timeInMeetings}% of their time in instructional meetings.`
            : ""}
        </p>
      </div>
    </div>
  );
}

export default App;
