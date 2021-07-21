import * as express from "express";
import { Movie } from "./movie.model";

export const getDissimilarMovies = (topN: number): number[] => {
  // TODO: similarity 계산
  return Array(topN)
    .fill(0)
    .map((_, i) => i + 1);
};
