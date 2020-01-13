const DEFAULT_DB_ERROR_MESSAGE = "Database error";
const DEFAULT_NOT_FOUND_MESSAGE = "Entity not found";

let connection = {};

if (process.env.LOCAL_DB_USERNAME !== undefined) {
  connection.host = "localhost";
  connection.user = process.env.LOCAL_DB_USERNAME;
  connection.password = process.env.LOCAL_DB_PASSWORD;
  connection.database = process.env.DEFAULT_DB_NAME;
  console.log("☁️ Connecting to local DB", connection);
} else if (process.env.DB_INSTANCE_CONNECTION_NAME) {
  connection = {
    host: `/cloudsql/${process.env.DB_INSTANCE_CONNECTION_NAME}`,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  };
  console.log("☁️ Connecting via Cloud Run", connection);
} else {
  connection = {
    host: process.env.DATABASE_URL,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: true
  };
  console.log("☁️ Connecting via Cloud SQL Engine", connection);
}

const knex = require("knex")({
  client: "pg",
  connection: connection
});

module.exports = {
  knex,
  async insert(table, data) {
    return knex(table)
      .insert(data)
      .returning("*")
      .then(res => res[0])
      .catch(err => {
        throw Error(DEFAULT_DB_ERROR_MESSAGE);
      });
  },
  async queryForOne(table, data) {
    return await knex(table)
      .where(data)
      .then(results => results[0])
      .catch(err => {
        throw Error(DEFAULT_NOT_FOUND_MESSAGE);
      });
  }
};
