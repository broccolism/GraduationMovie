import * as express from "express";
import { MoviePath } from "../constant/path";
import * as Service from "./movie.service";
import * as Models from "./movie.model";
import { Request } from "express";
import { get200ConsoleMessage } from "../util/generator";

const router = express.Router();

router.get(
  MoviePath.GET_DISSIMILAR,
  async (req: Request<{}, {}, {}, Models.GetDissimilarReq>, res) => {
    const movieIds: number[] = await Service.getDissimilarMovies(req.query);
    const result: Models.GetDissimilarRes = { movieIds: movieIds };
    res.status(200).send(result);
    console.log(get200ConsoleMessage("getDissimilarMovies", result));
  }
);

router.get(
  MoviePath.GET_TOP_N_BY_ID,
  async (req: Request<{}, {}, {}, Models.GetTopNByIdReq>, res) => {
    const movieIds: number[] = await Service.getTopNMoviesById(req.query);
    const result: Models.GetTopNByIdRes = { movieIds: movieIds };
    res.status(200).send(result);
    console.log(get200ConsoleMessage("getTopNMoviesById", result));
  }
);

router.get(
  MoviePath.GET_TOP_N_FOR_EVERY,
  async (req: Request<{}, {}, {}, Models.GetTopNForEveryReq>, res) => {
    try {
      const movieIds: number[] = await Service.getTopNMoviesForEvery(req.query);

      const result: Models.GetTopNForEveryRes = { movieIds: movieIds };
      res.status(200).send(result);
      console.log(get200ConsoleMessage("getTopNMoviesForEvery", result));
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
      await Service.rateOneMovie(req.query);
      res.status(200).send();
      console.log(get200ConsoleMessage("rateOneMovie", {}));
    } catch (err) {
      console.error(err);
      res.status(500).send("SERVER ERROR: rate one movie");
    }
  }
);

router.get(
  MoviePath.GET_POSTER,
  async (req: Request<{}, {}, {}, Models.GetPosterReq>, res) => {
    try {
      const result: Models.GetPosterRes = await Service.getPosterAndTitleById(
        req.query
      );
      res.status(200).send(result);
      console.log(get200ConsoleMessage("getPosterAndTitleById", result));
    } catch (err) {
      console.error(err);
      res.status(500).send("SERVER ERROR: get movie poster by id");
    }
  }
);

router.get(
  MoviePath.GET_IMAGE,
  async (req: Request<{}, {}, {}, Models.GetImageReq>, res) => {
    try {
      const result: Models.GetImageRes = await Service.getImageAndTitleById(
        req.query
      );
      res.status(200).send(result);
      console.log(get200ConsoleMessage("getImageAndTitleById", result));
    } catch (err) {
      console.error(err);
      res.status(500).send("SERVER ERROR: get movie poster by id");
    }
  }
);

router.get(
  MoviePath.GET_DETAIL,
  async (req: Request<{}, {}, {}, Models.GetDetailReq>, res) => {
    try {
      const result: Models.GetDetailRes = await Service.getDetail(req.query);
      res.status(200).send(result);
      console.log(get200ConsoleMessage("getDetail", result));
    } catch (err) {
      console.error(err);
      res.status(500).send("SERVER ERROR: get movie detail");
    }
  }
);

router.get(
  MoviePath.SEARCH,
  async (req: Request<{}, {}, {}, Models.SearchMovieReq>, res) => {
    try {
      const result: Models.SearchMovieRes = await Service.searchMovie(
        req.query
      );
      res.status(200).send(result);
      console.log(get200ConsoleMessage("searchMovie", result));
    } catch (err) {
      console.error(err);
      res.status(500).send("SERVER ERROR: search movie");
    }
  }
);

router.get(
  MoviePath.SEARCH_BY_KEYWORD,
  async (req: Request<{}, {}, {}, Models.SearchMovieByKeywordReq>, res) => {
    try {
      const result: Models.SearchMovieByKeywordRes =
        await Service.searchMovieByKeyword(req.query);
      res.status(200).send(result);
      console.log(get200ConsoleMessage("searchMovieByKeyword", result));
    } catch (err) {
      console.error(err);
      res.status(500).send("SERVER ERROR: search movie by keyword");
    }
  }
);

export = router;
