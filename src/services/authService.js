import { jwtDecode } from "jwt-decode";
import http from "./httpService";
import config from "../config.json";
import axios from 'axios';
const apiEndpoint = config.apiUrl + "/Authentication";
const tokenKey = "token";
http.setJwt(getJwt());

export async function login(email, password, selectedRole) {
  const { data: jwt } = await axios.post(apiEndpoint + "/Login", {
    email,
    password,
    selectedRole
  });
  
  console.log(jwt);
  localStorage.setItem(tokenKey, jwt.jwtToken);
  // return jwtDecode(jwt);
}
export function register(data) {
  return http.post(`${apiEndpoint}/Register`, data);
}
export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    console.log(jwtDecode(jwt));
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
  register,
};
