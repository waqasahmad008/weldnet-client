import axios from "axios";

export const LOGIN_URL = "api/auth/login";
export const REGISTER_URL = "http://localhost:5000/signup";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";

export const ME_URL = "api/me";

export function login(email, password) {
  return axios.post(LOGIN_URL, { email, password });
}

export function register(Email, Name, Password, Company,Address,Telephone) {
  console.log(Email);
  // return axios.post("http://localhost:3000/signup", {Email:Email }).then(res=>{
  //   console.log(res);
  // });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}
