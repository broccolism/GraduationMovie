import axios from "axios";
import { OMDB_HOST } from "../constant/host";

const omdb = axios.create({
  baseURL: OMDB_HOST,
});

export default omdb;
