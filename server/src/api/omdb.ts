import "dotenv/config";
import omdb from "../config/omdb";

const KEY = `apikey=${process.env.OMDB_API_KEY}`;

export const getOmdbMovieDetails = async (movieId: string) => {
  const res = await omdb.get(`/?i=${movieId}&plot=short&${KEY}`);
  return res.data;
};
