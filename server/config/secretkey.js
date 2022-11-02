const secretKey = process.env.SECRETKEY; // 원하는 시크릿 키
const options = {
  algorithm: 'HS256', // 해싱 알고리즘
  expiresIn: '30m', // 토큰 유효 기간
  issuer: process.env.ISSUER,
};

export { secretKey, options };
