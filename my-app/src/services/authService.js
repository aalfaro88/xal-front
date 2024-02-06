// src/services/authService.js

import axios from "axios";
import { SERVER_URL } from "./SERVER_URL";

export const get = (route) => {
  return axios.get(SERVER_URL + route);
};

export const post = (route, body) => {
  return axios.post(SERVER_URL + route, body);
};

export const put = (route, body) => {
  return axios.put(SERVER_URL + route, body);
};

export const del = (route) => {
  return axios.delete(SERVER_URL + route);
};
