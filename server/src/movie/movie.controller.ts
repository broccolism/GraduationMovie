import * as express from "express";
import { MoviePath } from "../constant/path";
import * as MovieService from "./movie.service";
import * as Models from "./movie.model";
import { Request } from "express";

const router = express.Router();

router.get(
  MoviePath.GET_DISSIMILAR,
  async (req: Request<{}, {}, {}, Models.GetDissimilarReq>, res) => {
    const movieIds: number[] = await MovieService.getDissimilarMovies(
      req.query
    );
    const result: Models.GetDissimilarRes = { movieIds: movieIds };
    res.status(200).send(result);
  }
);

router.get(
  MoviePath.GET_TOP_N_BY_ID,
  async (req: Request<{}, {}, {}, Models.GetTopNByIdReq>, res) => {
    const movieIds: number[] = await MovieService.getTopNMoviesById(req.query);
    const result: Models.GetTopNByIdRes = { movieIds: movieIds };
    res.status(200).send(result);
  }
);

router.get(
  MoviePath.GET_TOP_N_FOR_EVERY,
  async (req: Request<{}, {}, {}, Models.GetTopNForEveryReq>, res) => {
    try {
      const movieIds: number[] = await MovieService.getTopNMoviesForEvery(
        req.query
      );

      const result: Models.GetTopNForEveryRes = { movieIds: movieIds };
      res.status(200).send(result);
    } catch (err) {
      console.error(err);
      res.status(500).send("SERVER ERROR: get top n movies for every");
    }
  }
);

router.get(
  MoviePath.RATE_ONE,
  async (req: Request<{}, {}, {}, Models.RateOneReq>, res) => {
    try {
      await MovieService.rateOneMovie(req.query);
      res.status(200).send();
    } catch (err) {
      console.error(err);
      res.status(500).send("SERVER ERROR: rate one movie");
    }
  }
);

router.get(
  MoviePath.GET_POSTER,
  async (req: Request<{}, {}, {}, Models.GetImageReq>, res) => {
    try {
      const result: Models.GetImageRes =
        await MovieService.getPosterAndTitleById(req.query);
      res.status(200).send(result);
    } catch (err) {
      console.error(err);
      res.status(500).send("SERVER ERROR: get movie poster by id");
    }
  }
);

export = router;
