import React, { useEffect } from "react";
import "./App.css";
import tick from "./tick.svg";
import cross from "./cross.svg";
import { useState } from "react";

const App = () => {
  const [attendance, setAttendance] = useState([]);
  const [students, setStudents] = useState([]);
  const [date, setDate] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showAttendance, setShowAttendance] = useState(false);
  const [report, setReport] = useState({});
  const [showReport, setShowReport] = useState(false);
  useEffect(() => {
    const fetchAllStudents = () => {
      fetch("http://localhost:4000/student")
        .then((response) => response.json())
        .then((students) => setStudents(students))
        .catch((err) => console.log(err));
    };
    fetchAllStudents();
  }, []);

  const handleDateSubmission = (e) => {
    e.preventDefault();
    const date = e.target.date.value;
    setDate(date);
    fetch(`http://localhost:4000/attendance/${date}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setAttendance(data);
          setShowAttendance(true);
          setShowForm(false);
          setShowReport(false);
        } else {
          setShowForm(true);
          setShowAttendance(false);
          setShowReport(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleAttendanceSubmission = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const attendanceData = [];
    formData.forEach((value, key) => {
      const data = {
        id: +key,
        present: value === "true",
      };
      attendanceData.push(data);
    });
    fetch(`http://localhost:4000/attendance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date, studentData: attendanceData }),
    })
      .then((res) => res.json())
      .then((data) => {
        setAttendance(data);
        setShowAttendance(true);
        setShowForm(false);
        setShowReport(false);
      })
      .catch((err) => console.log(err));
  };
  const getAllAttendance = () => {
    fetch("http://localhost:4000/attendance")
      .then((response) => response.json())
      .then((report) => {
        console.log(report);
        setReport(report);
        setShowAttendance(false);
        setShowForm(false);
        setShowReport(true);
      })
      .catch((err) => console.log(err));
  };
  return (
    <main>
      <section className="search">
        <form onSubmit={handleDateSubmission} className="form">
          <div className="form-input">
            <input type="date" name="date" />
          </div>
          <div className="form-action">
            <button type="submit">Search</button>
          </div>
        </form>
        <div className="form-action">
          <button type="button" onClick={getAllAttendance}>
            fetch Attendance Report
          </button>
        </div>
      </section>
      {showReport && (
        <section>
          <ul>
            {report.attendance.map((student) => {
              return (
                <li key={student.id} className="attendance">
                  <span>{student.name}</span>
                  <span>{`${student.numberOfPresent}/${report.totalDates}`}</span>
                  <span>
                    {(student.numberOfPresent / report.totalDates).toFixed(2) *
                      100}
                    %
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      )}
      {showAttendance && (
        <section>
          <ul>
            {attendance.map((student) => {
              return (
                <li key={student.id} className="attendance">
                  <span>{student.name}</span>
                  {student.Attendance.present ? (
                    <span>
                      <img src={tick} alt="tick" width={15} />
                      {"   "}
                      present
                    </span>
                  ) : (
                    <span>
                      <img src={cross} alt="cross" width={15} />
                      {"   "}
                      absent
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}
      {showForm && (
        <section>
          <form
            className="attendance-form"
            onSubmit={handleAttendanceSubmission}
          >
            {students.map((student) => (
              <div key={student.id} className="attendance">
                <span>{student.name}</span>
                <div className="form-input">
                  <input
                    type="radio"
                    id={`present-${student.id}`}
                    name={`${student.id}`}
                    value="true"
                    required
                  />
                  <label htmlFor={`present-${student.id}`}>present</label>
                </div>
                <div className="form-input">
                  <input
                    type="radio"
                    id={`absent-${student.id}`}
                    name={`${student.id}`}
                    value="false"
                    required
                  />
                  <label htmlFor={`absent-${student.id}`}>absent</label>
                </div>
              </div>
            ))}
            <div className="attendance-form-action">
              <button type="submit">Submit</button>
            </div>
          </form>
        </section>
      )}
    </main>
  );
};

export default App;
