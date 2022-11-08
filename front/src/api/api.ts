import axios from "axios";

// env 파일에서 dev, pro 로 설정 가능
// var testHost = process.env.REACT_APP_MODE === 'dev' ? process.env.REACT_APP_BACK_BASE_URL : process.env.REACT_APP_BACK_PRO_URL;

var testHost = process.env.REACT_APP_BACK_BASE_URL;

export const serverHost = testHost;

export const Axios = axios.create({
  baseURL: `${serverHost}`,
  timeout: 180000,
  withCredentials: true,
  // headers: {
  //   Authorization: `Bearer ${''}` // 토큰 넣어야 함
  // }
});
