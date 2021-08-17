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
  if (res.data.results.length > 0) {
    return res.data.results[0].profile_path ?? "-";
  } else {
    return "-";
  }
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
  keyword: string,
  page: number
): Promise<number[]> => {
  const res = await tmdb.get(
    `/search/movie?query=${keyword}&year=2020&${KEY}&page=${page}&include_adult=false`
  );
  const tmdbIds = res.data.results.map((movie: any) => movie.id);
  return tmdbIds;
};
