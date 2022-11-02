import { verify } from './jwt.js';
import { response, not_found, bad_response, not_response } from './responseMSG.js';
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

const authUtil = {
  checkToken: async (req, res, next) => {
    var token = req.headers.token;
    // 토큰 없음
    if (token === undefined) return res.json(await not_response('토큰이 없습니다.'));
    // decode
    const user = await verify(token);
    // 유효기간 만료
    if (user === TOKEN_EXPIRED) return res.json(await not_response('유효기간 만료된 토큰'));
    // 유효하지 않는 토큰
    if (user === TOKEN_INVALID) return res.json(await not_response('유효하지 않은 토큰'));
    // req.idx = user.idx;
    next();
  },
};

export default authUtil;
