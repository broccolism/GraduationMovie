import db from "../config/db";
import * as Models from "./movie.model";

export const getTopNMoviesForEvery = async (topN: number) => {
  const [rows, _] = await db.execute(
    `SELECT movie_id as movieId, COUNT(id) as count
     FROM rates
     GROUP BY movie_id
     ORDER BY COUNT(id) DESC
     LIMIT ${topN};`
  );
  return (rows as any).map((row) => row.movieId);
};

export const rateOneMovie = async (
  userId: number,
  movieId: number,
  rate: number,
  time: number
) => {
  await db.execute(
    `INSERT INTO rates(user_id, movie_id, rating, timestamp)
     VALUES(${userId}, ${movieId}, ${rate}, ${time});`
  );
};

export const getTmdbIdAndTitle = async (
  id: number
): Promise<{ tmdbId: number; title: string }> => {
  const [rows, _] = await db.execute(
    `SELECT tmdb_id as tmdbId, title
     FROM movie
     WHERE id = ${id};`
  );
  return {
    tmdbId: rows[0].tmdbId,
    title: rows[0].title,
  };
};

export const getUserRating = async (
  userId: number,
  movieId: number
): Promise<number> => {
  const [rows, _] = await db.execute(
    `SELECT rating
     FROM rates
     WHERE movie_id = ${movieId} AND user_id = ${userId};`
  );
  return rows[0] == undefined ? -1 : rows[0].rating;
};

export const isMovieExist = async (
  tmdbId: number
): Promise<{ isExists: boolean; id: number }> => {
  const [rows, _] = await db.execute(
    `SELECT id
     FROM movie
     WHERE tmdb_id = ${tmdbId};`
  );

  return rows[0] == undefined
    ? {
        isExists: false,
        id: -1,
      }
    : {
        isExists: true,
        id: rows[0].id,
      };
};

export const createMovie = async (movie: Models.Movie): Promise<number> => {
  await db.execute(
    `INSERT INTO movie(title, genres, imdb_id, tmdb_id, year)
     VALUES("${movie.title}", "${movie.genres}", ${movie.tmdb_id}, ${movie.tmdb_id}, ${movie.year});`
  );

  const [rows, _] = await db.execute(
    `SELECT id
     FROM movie
     WHERE tmdb_id = ${movie.tmdb_id};`
  );

  return rows[0].id;
};
