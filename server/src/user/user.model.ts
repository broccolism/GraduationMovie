export interface WatchedMovie {
  id: number;
  watchedAt: Date;
}

export interface GetSimilarUserReq {
  id: number;
}

export interface GetSimilarUserRes {
  userId: number;
  nickname: string;
  likedMovieIds: number[];
}

export interface GetRewatchingMovieReq {
  userId: number;
}

export interface GetRewatchingMovieRes {
  movieId: number;
}

export interface GetIdByNicknameReq {
  nickname: string;
}

export interface GetIdByNicknameRes {
  id: number;
}

export interface CreateUserReq {
  nickname: string;
}

export interface CreateUserRes {
  id: number;
  success: boolean;
}

export interface GetUserInfoReq {
  id: number;
}

export interface GetUserInfoRes {
  nickname: string;
  unratedMovieCount: number;
  ratedMovieCount: number;
  watchedMovies: WatchedMovie[];
  success: boolean;
}

export interface SearchMovieWatchedReq {
  userId: number;
  keyword: string;
}

export interface SearchMovieWatchedRes {
  movieIds: number[];
}
