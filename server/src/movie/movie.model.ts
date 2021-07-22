export interface Movie {
  id: number;
  title: string;
  genres: string;
  imdb_id: number;
  tmdb_id: number;
  year: number;
}

export interface GetDissimilarReq {
  topN: number;
}

export interface GetDissimilarRes {
  movieIds: number[];
}

export interface GetTopNByIdReq {
  topN: number;
  userId: number;
}

export interface GetTopNByIdRes {
  movieIds: number[];
}

export interface GetTopNForEveryReq {
  topN: number;
}

export interface GetTopNForEveryRes {
  movieIds: number[];
}

export interface RateOneReq {
  userId: number;
  movieId: number;
  rating: number;
}

export interface RateOneRes {}

export interface GetPosterReq {
  movieId: number;
}

export interface GetPosterRes {
  posterUrl: string;
  title: string;
}

export interface GetImageReq {
  movieId: number;
}

export interface GetImageRes {
  imageUrl: string;
  title: string;
}

export interface GetDetailReq {
  movieId: number;
  userId: number;
}

export interface GetDetailRes {
  userRating: number;
  title: string;
  // TODO: 더 필요한 항목 추가
}
