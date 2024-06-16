import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/database.mjs";

class Student extends Model {}
Student.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Student",
    timestamps: false,
  }
);

export default Student;
