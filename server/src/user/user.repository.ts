import db from "../config/db";
import * as Models from "./user.model";

export const getLikedMovies = async (
  userId: number,
  hasLimit: boolean
): Promise<number[]> => {
  const MAX_COUNT = 6;
  const query: string = `
        SELECT movie_id as movieId
        FROM rates
        WHERE user_id = ${userId}
        ORDER BY timestamp DESC
    `;
  const concatQuery: string = hasLimit ? `LIMIT ${MAX_COUNT};` : `;`;

  const [rows, _] = await db.execute(query.concat(concatQuery));

  return (rows as any).map((row) => row.movieId);
};
