import axios from "axios";
import { TMDB_HOST } from "../constant/host";

const tmdb = axios.create({
  baseURL: TMDB_HOST,
});

export default tmdb;
