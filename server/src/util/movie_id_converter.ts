import * as MovieRepo from "../movie/movie.repository";
import * as TmdbApi from "../api/tmdb";
import { ESRCH } from "constants";

export const getTmdbIdAndTitle = async (
  id: number
): Promise<{ tmdbId: number; title: string }> =>
  await MovieRepo.getTmdbIdAndTitle(id);

export const getImdbIdByTmdbId = async (id: number): Promise<string> => {
  const res = await TmdbApi.getTmdbMovieDetails(id);
  return res.imdb_id;
};
