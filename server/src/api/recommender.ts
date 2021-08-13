import * as fs from "fs";
import { FilePath } from "../constant/path";

export const initAllJSON = () => {
  const recPath: string = FilePath.NEU_MF;
  const userPath: string = FilePath.USER_SIM;
  const moviePath: string = FilePath.MOVIE_DISSIM;

  const recBuffer: Buffer = fs.readFileSync(recPath);
  const userBuffer: Buffer = fs.readFileSync(userPath);
  const movieBuffer: Buffer = fs.readFileSync(moviePath);

  const recommendations: JSON = JSON.parse(recBuffer.toString("binary"));
  const similarUsers: JSON = JSON.parse(userBuffer.toString("binary"));
  const dissimilarMovies: JSON = JSON.parse(movieBuffer.toString("binary"));

  global.recommendations = recommendations;
  global.similarUsers = similarUsers;
  global.dissimilarMovies = dissimilarMovies;
};

export const getRecommendationsById = (
  userId: number,
  size: number,
  page: number
): number[] => {
  const allForUser: number[] = global.recommendations[userId.toString()];
  const start: number = (page - 1) * size;
  const end: number = page * size;
  return allForUser.slice(start, end);
};

export const getSimilarUser = (userId: number): number => {
  const similarUsers: number[] = global.similarUsers[userId.toString()];
  return similarUsers[1];
};

export const getDissimilarMovies = (): number[] => {
  const dissimilarMovies: number[] = JSON.parse(
    JSON.stringify(global.dissimilarMovies)
  );
  return dissimilarMovies;
};
