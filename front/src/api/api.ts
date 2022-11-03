import axios from "axios";

var testHost = process.env.REACT_APP_BACK_BASE_URL;

export const serverHost = testHost;

export const Axios = axios.create({
  baseURL: `${serverHost}`,
  timeout: 180000,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${''}` // 토큰 넣어야 함
  }
});
