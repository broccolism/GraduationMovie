import * as MovieRepo from "../movie/movie.repository";

export const getTmdbIdAndTitle = async (
  id: number
): Promise<{ tmdbId: number; title: string }> =>
  await MovieRepo.getTmdbIdAndTitle(id);
