require("dotenv").config({ path: "./.env" });

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: process.env.DEFAULT_DB_NAME,
      user: process.env.LOCAL_DB_USERNAME,
      password: process.env.LOCAL_DB_PASSWORD
    }
  },
};
