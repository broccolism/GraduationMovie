import axios from "axios";
import { GRAVATAR_HOST } from "../constant/host";

const gravatar = axios.create({
  baseURL: GRAVATAR_HOST,
});

export default gravatar;
