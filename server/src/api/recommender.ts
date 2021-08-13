import * as fs from "fs";
import { FilePath } from "../constant/path";

export const initAllJSON = () => {
  const recPath: string = FilePath.NEU_MF;
  const userPath: string = FilePath.USER_SIM;

  const recBuffer: Buffer = fs.readFileSync(recPath);
  const userBuffer: Buffer = fs.readFileSync(userPath);

  const recommendations: JSON = JSON.parse(recBuffer.toString("binary"));
  const similarUsers: JSON = JSON.parse(userBuffer.toString("binary"));

  global.recommendations = recommendations;
  global.similarUsers = similarUsers;
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
