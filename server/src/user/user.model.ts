import BaseRes from "../common/common.model";

export interface MovieWithTime {
  movieId: number;
  timestamp: Date;
}

export interface GetSimilarUserReq {
  id: number;
}

export interface GetSimilarUserRes extends BaseRes {
  userId: number;
  nickname: string;
  likedMovieIds: number[];
}

export interface GetRewatchingMovieReq {
  userId: number;
}

export interface GetRewatchingMovieRes extends BaseRes {
  movieId: number;
}

export interface GetIdByNicknameReq {
  nickname: string;
}

export interface GetIdByNicknameRes extends BaseRes {
  id: number;
}

export interface CreateUserReq {
  nickname: string;
}

export interface CreateUserRes extends BaseRes {
  id: number;
}

export interface GetUserInfoReq {
  userId: number;
}

export interface GetUserInfoRes extends BaseRes {
  nickname: string;
  unratedMovies: MovieWithTime[];
  ratedMovies: MovieWithTime[];
}

export interface SearchMovieWatchedReq {
  userId: number;
  keyword: string;
}

export interface SearchMovieWatchedRes extends BaseRes {
  movieIds: number[];
}

export interface WatchMovieReq {
  userId: number;
  movieId: number;
}
