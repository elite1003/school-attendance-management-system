import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/database.mjs";
import Student from "./student.mjs";
import Date from "./date.mjs";

// Attendance join table for many-to-many relationship
class Attendance extends Model {}
Attendance.init(
  {
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Student,
        key: "id",
      },
    },
    dateId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Date,
        key: "id",
      },
    },
    present: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Attendance",
    timestamps: false,
  }
);

export default Attendance;
