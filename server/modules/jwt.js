import pkg from 'rand-token';
const { uid } = pkg;
import jwt from 'jsonwebtoken';
const { sign: _sign, verify: _verify } = jwt;
import { secretKey, options } from '../config/secretKey.js';

const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

export async function sign(user) {
  /* 현재는 idx와 email을 payload로 넣었지만 필요한 값을 넣으면 됨! */
  const payload = {
    user: user,
    // idx: user.userIdx,
    // email: user.email,
  };
  const result = {
    //sign메소드를 통해 access token 발급!
    token: _sign(payload, secretKey, options),
    refreshToken: uid(256),
  };
  return result;
}
export async function verify(token) {
  let decoded;
  try {
    // verify를 통해 값 decode!
    decoded = _verify(token, secretKey);
  } catch (err) {
    if (err.message === 'jwt expired') {
      console.log('expired token');
      return TOKEN_EXPIRED;
    } else if (err.message === 'invalid token') {
      console.log('invalid token');
      console.log(TOKEN_INVALID);
      return TOKEN_INVALID;
    } else {
      console.log('invalid token');
      return TOKEN_INVALID;
    }
  }
  return decoded;
}
