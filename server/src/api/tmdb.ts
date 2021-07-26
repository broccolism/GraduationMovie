import { ESRCH } from "constants";
import "dotenv/config";
import tmdb from "../config/tmdb";
import { tmdbIdToCustomId } from "../util/converter";

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

export const getKeywordsById = async (movieId: number): Promise<string[]> => {
  const res = await tmdb.get(`/movie/${movieId}/keywords?${KEY}`);
  return res.data.keywords.length > 0
    ? res.data.keywords.map(
        (keyword: { id: number; name: string }) => keyword.name
      )
    : [];
};

export const searchMovieByKeyword = async (
  keyword: string
): Promise<number[]> => {
  const res = await tmdb.get(`/search/movie?query=${keyword}&${KEY}`);
  const tmdbIds = res.data.results.map((movie: any) => movie.id);
  return await Promise.all(
    tmdbIds.map(
      async (id: number) => await tmdbIdToCustomId(id).catch((err) => {})
    )
  );
};
