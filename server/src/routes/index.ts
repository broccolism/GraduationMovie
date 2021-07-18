import * as express from "express";
import db from "../database/connection";

const app: express.Application = express();

app.get(
  "/",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    return db.query("SELECT * FROM MOVIE WHERE id=100", (err, result) => {
      if (err) throw err;
      console.log(result);
      return res.send(result);
    });
    // res.send("hello typescript express!");
  }
);

export default app;
