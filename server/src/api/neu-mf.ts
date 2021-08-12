import * as fs from "fs";
import * as path from "path";

export const initAllRecommendations = () => {
  const filePath: string = path.join(__dirname, "../data/NeuMF.json");
  const buffer: Buffer = fs.readFileSync(filePath);
  const data: JSON = JSON.parse(buffer.toString("binary"));

  global.recommendations = data;
};

export const getRecommendationsById = (
  userId: number,
  size: number,
  page: number
): number[] => {
  const allForUser: number[] = global.recommendations[userId.toString()];
  const start: number = (page - 1) * size;
  const end: number = page * size;
  console.log(`@@@@@@@@@@ ${userId}, ${size}, ${page}`);
  console.log(`@@@@@@@@@@ ${end - start}`);
  console.log(`@@@@@@@@@@ from ${start} to ${end}`);
  return allForUser.slice(start, end);
};
