import db from "../config/database";

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
