import axios from "axios";

export const nodeProjectAPI = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
});