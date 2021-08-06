export interface MovieWithTime {
  movieId: number;
  timestamp: Date;
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
}

export interface GetUserInfoReq {
  userId: number;
}

export interface GetUserInfoRes {
  nickname: string;
  unratedMovies: MovieWithTime[];
  ratedMovies: MovieWithTime[];
}

export interface SearchMovieWatchedReq {
  userId: number;
  keyword: string;
}

export interface SearchMovieWatchedRes {
  movieIds: number[];
}
