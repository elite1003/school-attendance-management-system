import React from "react";
import "./App.css";
import { useState } from "react";
const App = () => {
  const [attendance, setAttendance] = useState([]);
  const handleDateSubmission = (e) => {
    e.preventDefault();
    console.log(e.target.date.value);
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
          <button type="button">fetch Attendance Report</button>
        </div>
      </section>
      <section>
        <ul>
          <li>
            a{" "}
            <form className="form">
              <div className="form-input">
                <input
                  type="radio"
                  id="present"
                  name="attendance"
                  value={true}
                />
                <label htmlFor="present">present</label>
              </div>
              <div className="form-input">
                <input
                  type="radio"
                  id="absent"
                  name="attendance"
                  value={false}
                />
                <label htmlFor="absent">absent</label>
              </div>
            </form>
          </li>
        </ul>
      </section>
    </main>
  );
};

export default App;
