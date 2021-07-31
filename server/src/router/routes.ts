import * as express from "express";
import * as movie from "../movie/movie.controller";
import * as user from "../user/user.controller";

const router = express.Router();

router.use("/movie", movie);
router.use("/user", user);
router.use("/", (_, res) => res.send("Server is running..."));

export = router;
