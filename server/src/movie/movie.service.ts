import * as Models from "./movie.model";
import * as Repo from "./movie.repository";
import * as Api from "../api/tmdb";
import { getTmdbIdAndTitle } from "../util/movie_id_converter";
import { TMDB_IMAGE_HOST } from "../constant/host";

export const getDissimilarMovies = async (
  param: Models.GetDissimilarReq
): Promise<number[]> => {
  // TODO: similarity 계산
  return Array.from({ length: param.topN }, (_, i) => i + 1);
};

export const getTopNMoviesById = async (
  param: Models.GetTopNByIdReq
): Promise<number[]> => {
  // TODO: similarity 계산
  return Array.from({ length: param.topN }, (_, i) => i + 1);
};

export const getTopNMoviesForEvery = async (
  param: Models.GetTopNForEveryReq
): Promise<number[]> => {
  const result = await Repo.getTopNMoviesForEvery(param.topN);
  return result;
};

export const rateOneMovie = async (param: Models.RateOneReq): Promise<void> => {
  const datetime: number = Date.now();
  await Repo.rateOneMovie(param.userId, param.movieId, param.rating, datetime);
};

export const getPosterAndTitleById = async (
  param: Models.GetPosterReq
): Promise<Models.GetImageRes> => {
  const { tmdbId, title }: { tmdbId: number; title: string } =
    await getTmdbIdAndTitle(param.movieId);
  const result = await Api.getMovieImages(tmdbId);
  const imagePath = result.backdrops[0].file_path;

  const res: Models.GetImageRes = {
    imageUrl: TMDB_IMAGE_HOST + imagePath,
    title: title,
  };
  return res;
};
