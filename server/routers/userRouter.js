import express from 'express';
import authUtil from '../modules/auth.js';

import { response, not_found, bad_response, not_response } from '../modules/responseMSG.js';

const userRouter = express.Router();
import _pool from '../modules/database.js';
import { verify } from '../modules/jwt.js';
const pool = _pool();

var query = '';

// 회원가입
userRouter.post('/join', async (req, res, next) => {
  const member = req.body;
  query = 'select * from member where member_code = ?'
  const [rows] = await pool.query(query, [member.id])
  if (rows.length > 0) {
    return res.json(await not_response('아이디가 중복됩니다.'));
  }

  query = 'insert into member (member_code, password, member_name, gender, email) values (?, SHA2(?, 224), ?, ?, ?)'
  const data = await pool.query(query, [member.id, member.password, member.nickname, member.gender, member.email])

  if (data.length > 0) {
    res.status(201).json(await response('회원가입 성공'))
  } else {
    res.json(await not_found())
  }
})

// 회원 정보 수정
userRouter.patch('/update', async (req, res, next) => {
  var token = req.headers.authorization.split('Bearer ')[1];
  const user = await verify(token);
  const body = req.body;

  query = 'update member set member_name = ?, member_code = ?, gender = ?, email = ? where member_id = ?';

  const [data] = await pool.query(query, [body.nickname, body.id, body.gender, body.email, user.id]);

  if (data) {
    res.status(201).json(await response('정보 수정 성공'));
  } else {
    res.json(await not_found());
  }
});

export default userRouter;
