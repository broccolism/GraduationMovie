import * as mysql from "mysql";

const config = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "0000",
  database: "movie_service",
};

const db = mysql.createConnection(config);
db.connect();

export default db;
