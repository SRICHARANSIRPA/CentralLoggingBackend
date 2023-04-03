require("dotenv").config();

module.exports = {
  development: {
    username: "charan",
    password: "Charan333@",
    database: "assignment_db",
    host: "127.0.0.1",
    dialect: "postgres",
    logging: false,
  },
  test: {
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE_TEST,
    host: process.env.PGHOST,
    dialect: "postgres",
    logging: false,
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
