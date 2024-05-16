import http from "./httpService";
import config from "../config.json";
const apiEndpoint = config.apiUrl + "/File";
function fileUrl(id) {
  return `${apiEndpoint}/DownloadFile?id=${id}`;
}
export function uploadFile(file) {
  return http.post(`${apiEndpoint}/UploadFile`, file, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
export function setSubmissionType(id) {
  return http.post(apiEndpoint, {
    categoryId: id,
  });
}
export function downloadFile(id) {
  return http.get(fileUrl(id), {
    responseType: "blob",
  });
}
// /api/ / UploadFile;
