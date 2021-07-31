import * as Models from "./user.model";
import * as Repo from "./user.repository";
import * as GravatarApi from "../api/gravatar";

export const getSimilarUser = async (
  param: Models.GetSimilarUserReq
): Promise<Models.GetSimilarUserRes> => {
  const userId: number = 100;
  const nickname: string = "scornfulDingo7";
  const likedMovieIds: number[] = await Repo.getLikedMovies(userId, true);
  return { userId, nickname, likedMovieIds };
};
