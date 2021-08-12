import BaseRes from "../common/common.model";

export interface Movie {
  id: number;
  title: string;
  genres: string;
  imdb_id: number;
  tmdb_id: number;
  year: number;
}

export interface Actor {
  name: string;
  profileUrl: string;
}

export interface GetDissimilarReq {
  topN: number;
}

export interface GetDissimilarRes extends BaseRes {
  movieIds: number[];
}

export interface GetTopNByIdReq {
  userId: number;
  size: number;
  page: number;
}

export interface GetTopNByIdRes extends BaseRes {
  movieIds: number[];
}

export interface GetTopNForEveryReq {
  topN: number;
}

export interface GetTopNForEveryRes extends BaseRes {
  movieIds: number[];
}

export interface RateOneReq {
  userId: number;
  movieId: number;
  rating: number;
}

export interface RateOneRes extends BaseRes {}

export interface GetPosterReq {
  movieId: number;
}

export interface GetPosterRes extends BaseRes {
  posterUrl: string;
  title: string;
}

export interface GetImageReq {
  movieId: number;
}

export interface GetImageRes extends BaseRes {
  imageUrl: string;
  title: string;
}

export interface GetDetailReq {
  movieId: number;
  userId: number;
}

export interface GetDetailRes extends BaseRes {
  youtubeUrl: string;
  award: string; // 없을 경우 "-"
  title: string;
  year: number;
  genre: string;
  avgRating: number;
  ratingPeopleCount: number;
  userRating: number; // 없을 경우 -1
  summary: string; // 없을 경우 "-"
  plot: string;
  director: string;
  writers: string;
  actors: Actor[];
}

export interface SearchMovieReq {
  keyword: string;
}

export interface SearchMovieRes extends BaseRes {
  movieIds: number[];
  keywords: string[];
}

export interface SearchMovieByKeywordReq {
  keyword: string;
}

export interface SearchMovieByKeywordRes extends BaseRes {
  movieIds: number[];
}
