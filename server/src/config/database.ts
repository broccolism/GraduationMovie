import * as mysql from "mysql2";

const config = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "0000",
  database: "movie_service",
};

const connection = mysql.createPool(config);

export default connection.promise();
