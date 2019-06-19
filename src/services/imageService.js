import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/apis";

export function saveImage(image) { 
  return http.get(apiEndpoint);
}