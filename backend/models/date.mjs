import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/database.mjs";

class Date extends Model {}
Date.init(
  {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Date",
    timestamps: false,
  }
);

export default Date;
