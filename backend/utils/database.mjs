import { Sequelize } from "sequelize";

const sequelize = new Sequelize("school-attendance", "root", "Root1234@", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
