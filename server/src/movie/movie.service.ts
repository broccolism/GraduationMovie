import * as Models from "./movie.model";
import * as Repo from "./movie.repository";
import * as TmdbApi from "../api/tmdb";
import {
  getImdbIdByTmdbId,
  getTmdbIdAndTitle,
} from "../util/movie_id_converter";
import { TMDB_IMAGE_HOST, YOUTUBE_WATCH } from "../constant/host";
import * as OmdbApi from "../api/omdb";

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
): Promise<Models.GetPosterRes> => {
  const { tmdbId, title }: { tmdbId: number; title: string } =
    await getTmdbIdAndTitle(param.movieId);
  const images = await TmdbApi.getMovieImages(tmdbId);
  const posterPath = images.posters[0].file_path;

  const res: Models.GetPosterRes = {
    posterUrl: TMDB_IMAGE_HOST + posterPath,
    title: title,
  };
  return res;
};

export const getImageAndTitleById = async (
  param: Models.GetImageReq
): Promise<Models.GetImageRes> => {
  const { tmdbId, title }: { tmdbId: number; title: string } =
    await getTmdbIdAndTitle(param.movieId);
  const images = await TmdbApi.getMovieImages(tmdbId);
  const imagePath = images.backdrops[0].file_path;

  const res: Models.GetImageRes = {
    imageUrl: TMDB_IMAGE_HOST + imagePath,
    title: title,
  };
  return res;
};

export const getDetail = async (
  param: Models.GetDetailReq
): Promise<Models.GetDetailRes> => {
  const { tmdbId, title }: { tmdbId: number; title: string } =
    await getTmdbIdAndTitle(param.movieId);
  const imdbId: string = await getImdbIdByTmdbId(tmdbId);

  const tmdbDetail = await TmdbApi.getTmdbMovieDetails(tmdbId);
  const omdbDetail = await OmdbApi.getOmdbMovieDetails(imdbId);

  const videos = await TmdbApi.getMovieVideo(tmdbId);
  const userRating = await Repo.getUserRating(param.userId, param.movieId);

  const actorNames: string[] = omdbDetail.Actors.split(", ");
  const actorProfiles: Models.Actor[] = await Promise.all(
    actorNames.map(async (name: string) => {
      const profilePath = await TmdbApi.getActorProfileByName(name);
      const actor: Models.Actor = {
        name: name,
        profileUrl: TMDB_IMAGE_HOST + profilePath,
      };
      return actor;
    })
  );

  const res: Models.GetDetailRes = {
    youtubeUrl: videos.length > 0 ? YOUTUBE_WATCH + videos[0].key : "-",
    award: omdbDetail.Awards ?? "-", // 없을 경우 "-"
    title: title,
    year: tmdbDetail.release_date.split("-")[0],
    genre: omdbDetail.Genre.split(", ")[0],
    avgRating: tmdbDetail.vote_average / 2,
    ratingPeopleCount: tmdbDetail.vote_count,
    userRating: userRating, // 없을 경우 -1
    summary: tmdbDetail.overview ?? "-", // 없을 경우 "-"
    plot: omdbDetail.Plot,
    director: omdbDetail.Director,
    writers: omdbDetail.Writer,
    actors: actorProfiles,
  };

  return res;
};
