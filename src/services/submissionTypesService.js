import http from "./httpService";
import config from "../config.json";
const apiEndpoint = config.apiUrl + "/Type";
export function getSubmissionTypes() {
  return http.get(apiEndpoint);
}
