import Student from "../models/student.mjs";
import Date from "../models/date.mjs";
import Attendance from "../models/attendance.mjs";
import sequelize from "../utils/database.mjs";

export const getAllStudents = (req, res, next) => {
  Student.findAll()
    .then((students) => res.status(200).json(students))
    .catch((err) => res.status(500).json({ error: err }));
};
export const getOneAttendance = (req, res, next) => {
  const date = req.params.date;
  Date.findOne({ where: { date: date } }).then((date) => {
    if (date) {
      date
        .getStudents()
        .then((students) => res.status(200).json(students))
        .catch((err) => console.log(err));
    } else {
      res.status(404).json(null);
    }
  });
};
export const getAllAttendance = async (req, res, next) => {
  try {
    const totalDates = await Date.count();

    const [results] = await sequelize.query(`
      SELECT 
        s.id,
        s.name,
        COUNT(a.present) AS numberOfPresent
      FROM 
        Students s
      INNER JOIN 
        Attendances a ON s.id = a.StudentId
      WHERE 
        a.present = true
      GROUP BY 
        s.id
    `);

    res.status(200).json({ totalDates, attendance: results });
  } catch (error) {
    res.status(400).json(false);
  }
};

export const postAttendance = async (req, res, next) => {
  const { date, studentData } = req.body;
  const [newDate] = await Date.findOrCreate({ where: { date } });
  const saveAttendance = async (studentData) => {
    for (const student of studentData) {
      await newDate.addStudent(student.id, {
        through: { present: student.present },
      });
    }
  };
  try {
    await saveAttendance(studentData);
    const students = await newDate.getStudents();
    res.status(200).json(students);
  } catch (error) {
    res.status(400).json();
  }
};
