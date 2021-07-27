import * as express from "express";
import * as movie from "../movie/movie.controller";

const router = express.Router();

router.use("/movie", movie);

router.use("/", (_, res) => res.send("Server is running..."));

export = router;
