import * as express from "express";
import { Movie } from "./movie.model";
import * as MovieController from "./movie.controller";
import { Request } from "express";

const router = express.Router();

router.get(
  "/dissimilar",
  async (req: Request<{}, {}, {}, DissimilarReq>, res) => {
    const { query } = req;

    const movieIds: number[] = await MovieController.getDissimilarMovies(
      query.topN
    );
    res.send("router testing...");
  }
);

interface DissimilarReq {
  topN: number;
}

export = router;
