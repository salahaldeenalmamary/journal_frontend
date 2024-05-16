import http from "./httpService";
import config from "../config.json";
const apiEndpoint = config.apiUrl + "/Submissions";

function submissionUrl(id) {
  return `${apiEndpoint}/${id}`;
}
export function getSubmissions() {
  return http.get(apiEndpoint);
}
export function addSubmissionWithType(id) {
  return http.post(apiEndpoint, {
    typeId: id,
  });
}
export function updateSubmission(id, submission) {
  // const body = { ...submission };
  // delete body._id;
  return http.put(submissionUrl(id), submission);
}
export function getSubmissionById(id) {
  return http.get(submissionUrl(id));
}
export function getSubmissionByAuthorId(id) {
  return http.get(`${apiEndpoint}/GetSubmissionByAuthorId/${id}`);
}
