import { Sequelize } from "sequelize-typescript";
import Country from "./models/Country";
import Continent from "./models/Continent";

// NOTE: this should come from .env file and NOT be hardcoded here
// this is a POC so credentials are stored here for convenience
const config = {
  username: "postgres",
  password: "",
  database: "sequelize_ts_orm_poc",
  host: "localhost",
  dialect: "postgres",
  logging: console.log,
};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: "localhost",
    dialect: "postgres",
    repositoryMode: true,
  }
);

sequelize.addModels([Continent]);
sequelize.addModels([Country]);

// NOTE: one can also map entire folders...
//const modelsPath = __dirname + "./models";
//sequelize.addModels([__dirname + modelsPath]);

// NOTE: one can also attempt to manage associations here
// Object.keys(Database).forEach((modelName) => {
//   if (Database[modelName].associate) {
//     Database[modelName].associate(Database);
//   }
// });

export default sequelize;
