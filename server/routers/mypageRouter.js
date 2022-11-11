import express from 'express';
import { response, not_found, bad_response, not_response } from '../modules/responseMSG.js';

const mypageRouter = express.Router();
import _pool from '../modules/database.js';
import { verify } from '../modules/jwt.js';
const pool = _pool();

let query = '';

mypageRouter.get('/', async (req, res, next) => {
  var token = req.headers.authorization.split('Bearer ')[1];
  const user = await verify(token)

  let heart_query = `
    select h.cat_id, c.age, t.name as type, c.gender, c.create_date from member_to_heart as h
    left join cat as c on c.cat_id = h.cat_id
    left join type as t on t.type_id = c.type
    where h.member_id = ?;
  `
  let member_query = `select member_name from member where member_id = ?`

  const [[data], [member]] = await Promise.all([
    pool.query(heart_query, [user.id]),
    pool.query(member_query, [user.id])
  ])

  if (member.length > 0) {
    res.status(201).json(await response({ heart: data, member: member[0].member_name }));
  } else {
    res.json(await not_found())
  }
})

// 정보 수정 시 정보 조회
mypageRouter.get('/info', async (req, res, next) => {
  var token = req.headers.authorization.split('Bearer ')[1];
  const user = await verify(token)

  query = `select email, gender, member_code as id, member_name as nickname from member where member_id = ?`;

  const [data] = await pool.query(query, [user.id])

  if (data.length > 0) {
    res.status(201).json(await response(data));
  } else {
    res.json(await not_found())
  }
})

export default mypageRouter;
