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

  query = 'select * from user where user_id = ? and password = ?';
  const [data] = await pool.query(query, [authBody.user_id, authBody.password]);
  const token = await sign(data[0].user_id);
  if (data.length > 0) {
    res.status(201).json(await response(token.token));
  } else {
    res.json(await not_found());
  }
});

authResult.post('/me', authUtil.checkToken, async (req, res, next) => {
  var token = req.headers.token;
  const user = await verify(token);
  if (user.user) {
    res.status(201).json(await response({ user_id: user.user, iat: user.iat, exp: user.exp }));
  } else {
    res.json(await not_found());
  }
});

authResult.post('/refresh', authUtil.checkToken, async (req, res, next) => {
  var oldToken = req.headers.token;
  const oldUser = await verify(oldToken);
  const token = await sign(oldUser.user);
  const user = await verify(token.token);
  if (user.user) {
    res.status(201).json(await response({ user_id: user.user, iat: user.iat, exp: user.exp }));
  } else {
    res.json(await not_found());
  }
});

export default authResult;
