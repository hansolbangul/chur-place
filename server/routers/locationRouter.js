import express from 'express';
import authUtil from '../modules/auth.js';

import { response, not_found, bad_response, not_response } from '../modules/responseMSG.js';

const userRouter = express.Router();
import _pool from '../modules/database.js';
const pool = _pool();

let query = '';

userRouter.get('/', async (req, res, next) => {
  console.log('user');

  query =
    'select * from cat left join type on cat.type = type.type_id;';
  const [data] = await pool.query(query);

  if (data.length > 0) {
    res.status(201).json(await response(data));
  } else {
    res.json(await not_found());
  }
});

userRouter.get('/:id', async (req, res, next) => {
  const cat_id = req.params.id;

  let comment_query =
    'select c.id, c.cat_id, c.comment, c.create_date, m.member_name from comment as c left join member as m on m.member_id = c.member_id where c.cat_id = ?';

  let tag_query = 'select name from cat_to_tag left join tag on tag.tag_id = cat_to_tag.tag_id where cat_id = ?'

  const [[comment], [tag]] = await Promise.all([
    pool.query(comment_query, [cat_id]),
    pool.query(tag_query, [cat_id])
  ])

  res.status(201).json(await response({ comment: comment, tag: tag }));
});

export default userRouter;
