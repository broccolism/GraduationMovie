import * as Models from "./user.model";
import * as Repo from "./user.repository";
import * as GravatarApi from "../api/gravatar";
import { getCurrentTimestamp } from "../util/generator";

export const getSimilarUser = async (
  param: Models.GetSimilarUserReq
): Promise<Models.GetSimilarUserRes> => {
  const userId: number = 100;
  const nickname: string = "scornfulDingo7";
  const likedMovies: Models.MovieWithTime[] = await Repo.getRatedMovies(
    userId,
    true
  );
  const likedMovieIds: number[] = likedMovies.map(
    (movie: Models.MovieWithTime) => movie.movieId
  );
  return { userId, nickname, likedMovieIds };
};

export const getIdByNickname = async (
  param: Models.GetIdByNicknameReq
): Promise<Models.GetIdByNicknameRes> => {
  const userId: number = await Repo.getIdByNickname(param.nickname);
  return { id: userId };
};

export const getRewatchingMovie = (
  param: Models.GetRewatchingMovieReq
): Models.GetRewatchingMovieRes => {
  // TODO: 실제 추천 영화 아이디 가져오기
  return { movieId: 300 };
};

export const getUserInfo = async (
  param: Models.GetUserInfoReq
): Promise<Models.GetUserInfoRes> => {
  const userId: number = param.userId;
  const nickname: string = await Repo.getNicknameById(userId);
  const unratedMovies: Models.MovieWithTime[] = await Repo.getUnratedMovies(
    userId
  );
  const ratedMovies: Models.MovieWithTime[] = await Repo.getRatedMovies(
    userId,
    false
  );

  return { nickname, unratedMovies, ratedMovies };
};

export const createUser = async (
  param: Models.CreateUserReq
): Promise<Models.CreateUserRes> => {
  await Repo.createUser(param.nickname);
  const id = await Repo.getIdByNickname(param.nickname);
  return { id };
};

export const searchMovieWatched = async (
  param: Models.SearchMovieWatchedReq
): Promise<Models.SearchMovieWatchedRes> => {
  const userId = param.userId;
  const keyword = param.keyword;
  const movieIds: number[] = await Repo.searchMovieWatched(userId, keyword);
  return { movieIds };
};

export const watchMovie = async (
  param: Models.WatchMovieReq
): Promise<void> => {
  const userId = param.userId;
  const movieId = param.movieId;
  const timestamp: number = getCurrentTimestamp();
  await Repo.watchMovie(movieId, userId, timestamp);
};
