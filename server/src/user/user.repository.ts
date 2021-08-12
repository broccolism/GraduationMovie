import db from "../config/db";
import * as Models from "./user.model";

export const getRatedMovies = async (
  userId: number,
  hasLimit: boolean
): Promise<Models.MovieWithTime[]> => {
  const MAX_COUNT = 6;
  const query: string = `
        SELECT movie_id as movieId, timestamp
        FROM rates
        WHERE user_id = ${userId}
        ORDER BY timestamp DESC
    `;
  const concatQuery: string = hasLimit ? `LIMIT ${MAX_COUNT};` : `;`;

  const [rows, _] = await db.execute(query.concat(concatQuery));
  const result: Models.MovieWithTime[] =
    rows[0] == undefined
      ? []
      : (rows as any).map((row) => {
          const rowResult: Models.MovieWithTime = {
            movieId: row.movieId,
            timestamp: row.timestamp,
          };
          return rowResult;
        });

  return result;
};

export const getUnratedMovies = async (
  userId: number
): Promise<Models.MovieWithTime[]> => {
  const [rows, _] = await db.execute(
    `SELECT movie_id as movieId, timestamp
     FROM watched
     WHERE user_id = ${userId} AND movie_id not in (
       SELECT movie_id
       FROM rates
       WHERE user_id = ${userId});
     `
  );

  const result: Models.MovieWithTime[] =
    rows[0] == undefined
      ? []
      : (rows as any).map((row) => {
          const rowResult: Models.MovieWithTime = {
            movieId: row.movieId,
            timestamp: row.timestamp,
          };
          return rowResult;
        });

  return result;
};

export const getIdByNickname = async (nickname: string): Promise<number> => {
  const [rows, _] = await db.execute(`
    SELECT id
    FROM user
    WHERE name = ${nickname};
  `);

  return rows[0] == undefined ? -1 : rows[0].id;
};

export const getNicknameById = async (id: number): Promise<string> => {
  const [rows, _] = await db.execute(`
    SELECT name
    FROM user
    WHERE id = ${id};
  `);

  return rows[0].name;
};

export const createUser = async (nickname: string): Promise<void> => {
  await db.execute(
    `INSERT INTO user(name)
     VALUES(${nickname});`
  );
};

export const searchMovieWatched = async (
  userId: number,
  keyword: string
): Promise<number[]> => {
  const [rows, _] = await db.execute(
    `SELECT w.movie_id as movieId
     FROM watched as w, movie as m
     WHERE w.user_id = ${userId}
           AND w.movie_id = m.id
           AND m.title LIKE "%${keyword}%";`
  );

  return rows[0] == undefined ? [] : (rows as any).map((row) => row.movieId);
};

export const watchMovie = async (
  movieId: number,
  userId: number,
  time: number
): Promise<void> => {
  await db.execute(
    `INSERT INTO watched(user_id, movie_id, timestamp)
     VALUES(${userId}, ${movieId}, ${time});`
  );
};
