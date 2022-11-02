import express from 'express';
import authUtil from '../modules/auth.js';

import { response, not_found, bad_response, not_response } from '../modules/responseMSG.js';

const userRouter = express.Router();
import _pool from '../modules/database.js';
const pool = _pool();

var query = '';

userRouter.post('/', async (req, res, next) => {
  const user = req.body;
  query = 'select * from user where user_id = ?';
  const [overlap] = await pool.query(query, [user.user_id]);

  // 아이디 중복 체크
  if (overlap.length > 0) {
    return res.json(await not_response('아이디가 중복됩니다.'));
  }

  query =
    'insert into user (user_id, password) values (?, ?)';
  const [rows] = await pool.query(query, [
    user.user_id,
    user.password,
  ]);

  query =
    "select user_id, password from user where seq = ?";
  const [data] = await pool.query(query, [rows.insertId]);
  console.log(data);
  if (data.length > 0) {
    res.status(201).json(await response(data));
  } else {
    res.json(await not_found());
  }
});

userRouter.get('/login', async (req, res, next) => {
  var query = 'select * from user_login';
  const [data] = await pool.query(query);
  if (data.length > 0) {
    res.status(201).json(await response(data));
  } else {
    res.json(await not_found());
  }
});

userRouter.get('/', authUtil.checkToken, async (req, res, next) => {
  console.log('user');
  const queryBody = req.query;
  query =
    "select seq, user_id, user_name from user where user_id = ?";
  const [data] = await pool.query(query, [queryBody.user_id]);
  if (data.length > 0) {
    res.status(201).json(await response(data));
  } else {
    res.json(await not_found());
  }
});

userRouter.patch('/:id', authUtil.checkToken, async (req, res, next) => {
  const user_id = req.params.id;
  const user = req.body;
  query =
    'update user set user_id = ?, password = ? where user_id = ?';
  await pool.query(query, [
    user.user_id,
    user.password,
    user_id,
  ]);

  query =
    "select user_id from user where user_id = ?";
  const [data] = await pool.query(query, [user.user_id]);

  if (data.length > 0) {
    res.status(201).json(await response(data));
  } else {
    res.json(await not_found());
  }
});

export default userRouter;
