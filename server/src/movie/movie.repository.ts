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
