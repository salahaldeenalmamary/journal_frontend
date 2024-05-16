import http from "./httpService";
import config from "../config.json";
const rolesEndPoint = config.apiUrl + "/Role";

export function getAllRoles() {
  return http.get(rolesEndPoint + "/GetAllRoles");
}
