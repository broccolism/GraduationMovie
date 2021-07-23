import { ESRCH } from "constants";
import "dotenv/config";
import tmdb from "../config/tmdb";

const KEY = `api_key=${process.env.TMDB_API_KEY}`;

export const getMovieImages = async (movieId: number) => {
  const res = await tmdb.get(`/movie/${movieId}/images?${KEY}`);
  return res.data;
};

export const getTmdbMovieDetails = async (movieId: number) => {
  const res = await tmdb.get(`/movie/${movieId}?${KEY}`);
  return res.data;
};

export const getMovieVideo = async (movieId: number): Promise<any[]> => {
  const res = await tmdb.get(`/movie/${movieId}/videos?${KEY}`);
  return res.data.results;
};

export const getActorProfileByName = async (name: string): Promise<string> => {
  const res = await tmdb.get(`/search/person?query=${name}&${KEY}`);
  return res.data.results.length > 0 ? res.data.results[0].profile_path : "-";
};
