import "dotenv/config";
import * as axios from "axios";
import tmdb from "../config/tmdb";

const KEY = process.env.TMDB_API_KEY;

export const getMovieImages = async (movieId: number) => {
  const res = await tmdb.get(`/movie/${movieId}/images?api_key=${KEY}`);
  return res.data;
};
