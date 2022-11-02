import axios from "axios";

var testHost = 'http://localhost:3010';

export const serverHost = testHost;

export const Axios = axios.create({
  baseURL: `${serverHost}`,
  timeout: 3000,
  withCredentials: true,
});
