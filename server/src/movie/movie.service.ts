import * as express from "express";
import * as Models from "./movie.model";
import * as Repo from "./movie.repository";

export const getDissimilarMovies = async (
  param: Models.GetDissimilarReq
): Promise<number[]> => {
  // TODO: similarity 계산
  return Array.from({ length: param.topN }, (_, i) => i + 1);
};

export const getTopNMoviesById = async (
  param: Models.GetTopNByIdReq
): Promise<number[]> => {
  // TODO: similarity 계산
  return Array.from({ length: param.topN }, (_, i) => i + 1);
};

export const getTopNMoviesForEvery = async (
  param: Models.GetTopNForEveryReq
): Promise<number[]> => {
  const result = await Repo.getTopNMoviesForEvery(param.topN);
  return result;
};

export const rateOneMovie = async (param: Models.RateOneReq): Promise<void> => {
  const datetime: number = Date.now();
  await Repo.rateOneMovie(param.userId, param.movieId, param.rating, datetime);
};
