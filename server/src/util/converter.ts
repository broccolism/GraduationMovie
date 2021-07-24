import * as MovieRepo from "../movie/movie.repository";
import * as TmdbApi from "../api/tmdb";
import * as Models from "../movie/movie.model";

export const blankToPlus = (str: string) => str.replace(" ", "+");

export const customIdToTmdbIdAndTitle = async (
  id: number
): Promise<{ tmdbId: number; title: string }> =>
  await MovieRepo.getTmdbIdAndTitle(id);

export const tmdbIdToImdbId = async (id: number): Promise<string> => {
  const res = await TmdbApi.getTmdbMovieDetails(id);
  return res.imdb_id;
};

export const tmdbIdToCustomId = async (tmdbId: number): Promise<number> => {
  console.log("@@@@@@@@@@ tmdb id:", tmdbId);
  const findInDB = await MovieRepo.isMovieExist(tmdbId);
  if (findInDB.isExists) {
    return findInDB.id;
  }

  const tmdbDetail = await TmdbApi.getTmdbMovieDetails(tmdbId);
  const movie: Models.Movie = {
    id: -1,
    title: tmdbDetail.title,
    genres: "undefined",
    imdb_id: 0,
    tmdb_id: tmdbId,
    year: +tmdbDetail.release_date.split("-")[0],
  };

  const id = await MovieRepo.createMovie(movie);
  return id;
};
