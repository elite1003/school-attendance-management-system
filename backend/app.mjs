import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import sequelize from "./utils/database.mjs";

//models
import Student from "./models/student.mjs";
import Date from "./models/date.mjs";
import Attendance from "./models/attendance.mjs";

//routes

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//associations
Student.belongsToMany(Date, { through: Attendance, foreignKey: "studentId" });
Date.belongsToMany(Student, { through: Attendance, foreignKey: "dateId" });

sequelize
  .sync()
  .then(() => {
    console.log("successfully connected to database");
    app.listen(4000, () => {
      console.log("Server running on port 4000");
    });
  })
  .catch((err) => {
    console.log("Error in connecting with database\n", err);
  });
