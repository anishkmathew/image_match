import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/search";

export function searchImage(image) {
 
  return http.get(apiEndpoint);
  //Real application this will be post and the return url will be having the search result with meta having the article ID.
  //Using the artile ID we have to search in articles and list the articles which matches the searched image
}