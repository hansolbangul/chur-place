import express from 'express';
import authUtil from '../modules/auth.js';

import { sign, verify } from '../modules/jwt.js';

import { response, not_found, bad_response, not_response } from '../modules/responseMSG.js';

const authResult = express.Router();
import _pool from '../modules/database.js';
const pool = _pool();

var query = '';

authResult.post('/login', async (req, res, next) => {
  const authBody = req.body;

  query = 'select * from member where member_code = ? and password = SHA2(?, 224)';
  const [data] = await pool.query(query, [authBody.member_id, authBody.password]);
  const token = await sign(data[0].member_id, data[0].member_name, data[0].member_code);
  if (data.length > 0) {
    res.status(201).json(await response({ token: token.token, name: data[0].member_name }));
  } else {
    res.json(await not_found());
  }
});

authResult.post('/me', authUtil.checkToken, async (req, res, next) => {
  var token = req.headers.authorization.split('Bearer ')[1];
  const user = await verify(token);
  console.log(user)
  if (user.id) {
    res.status(201).json(await response({ member_id: user.id, name: user.name, code: user.code, iat: user.iat, exp: user.exp }));
  } else {
    res.json(await not_found());
  }
});

authResult.post('/refresh', authUtil.checkToken, async (req, res, next) => {
  var oldToken = req.headers.authorization.split('Bearer ')[1];
  const oldUser = await verify(oldToken);
  const token = await sign(oldUser.id, oldUser.name, oldUser.code);
  const user = await verify(token.token);
  if (user.id) {
    res.status(201).json(await response({ member_id: user.id, name: user.name, code: user.code, iat: user.iat, exp: user.exp, token: token.token }));
  } else {
    res.json(await not_found());
  }
});

export default authResult;
