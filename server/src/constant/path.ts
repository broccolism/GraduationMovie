import * as path from "path";

export class MoviePath {
  static GET_DISSIMILAR = "/dissimilar";
  static GET_TOP_N_BY_ID = "/top-n/user";
  static GET_TOP_N_FOR_EVERY = "/top-n/every";
  static RATE_ONE = "/rate";
  static GET_POSTER = "/poster";
  static GET_IMAGE = "/image";
  static GET_DETAIL = "/detail";
  static SEARCH = "/search";
  static SEARCH_BY_KEYWORD = "/search/keyword";
}

export class UserPath {
  static GET_SIMILAR = "/similar";
  static GET_REWATCHING = "/re";
  static GET_ID_BY_NICKNAME = "/id";
  static CREATE = "/create";
  static GET_INFO = "/info";
  static SEARCH_WATCHED = "/search/watched";
  static WATCH_MOVIE = "/watch";
}

export class FilePath {
  static NEU_MF = path.join(__dirname, "../data/NeuMF.json");
}
