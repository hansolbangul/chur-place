import express from 'express';
import authUtil from '../modules/auth.js';

import { response, not_found, bad_response, not_response } from '../modules/responseMSG.js';

const catRouter = express.Router();
import _pool from '../modules/database.js';
const pool = _pool();

let query = '';

catRouter.post('/', async (req, res, next) => {
  const body = req.body;

  query = 'insert into `cat` (`age`, `lat`, `lon`, `type`, `member_id`, `gender`) values (?, ?, ?, ?, ?, ?)'
  const [rows] = await pool.query(query, [0, body.lat, body.lon, body.type, 0, 0]);

  body.tag.forEach(async (item) => {
    query = 'insert into cat_to_tag (cat_id, tag_id) values (?, ?)';
    await pool.query(query, [rows.insertId, item]);
  })

  query = 'select name from cat left join type on cat.type = type.type_id where cat.cat_id = ?'

  const [name] = await pool.query(query, [rows.insertId]);

  if (rows.insertId) {
    res.status(201).json(await response({ ...name[0], cat_id: rows.insertId }));
  } else {
    res.json(await not_found());
  }
});

catRouter.post('/comment/:id', async (req, res, next) => {
  const body = req.body;
  const cat_id = req.params.id;

  query = 'insert into comment (cat_id, member_id, comment) values (?, ?, ?)'
  const [rows] = await pool.query(query, [cat_id, 1, body.comment]);

  if (rows.insertId) {
    res.status(201).json(await response());
  } else {
    res.json(await not_found());
  }
});

catRouter.get('/type', async (req, res, next) => {
  console.log('user');

  query =
    'select * from type';
  const [data] = await pool.query(query);

  if (data.length > 0) {
    res.status(201).json(await response(data));
  } else {
    res.json(await not_found());
  }
});

catRouter.get('/tag', async (req, res, next) => {
  console.log('user');

  query =
    'select * from tag';
  const [data] = await pool.query(query);

  if (data.length > 0) {
    res.status(201).json(await response(data));
  } else {
    res.json(await not_found());
  }
});

catRouter.get('/:id', async (req, res, next) => {
  const cat_id = req.params.id;

  let comment_query =
    'select c.id, c.cat_id, c.comment, c.create_date, m.member_name from comment as c left join member as m on m.member_id = c.member_id where c.cat_id = ?';

  let tag_query = 'select name from cat_to_tag left join tag on tag.tag_id = cat_to_tag.tag_id where cat_to_tag.cat_id = ?'

  const [[comment], [tag]] = await Promise.all([
    pool.query(comment_query, [cat_id]),
    pool.query(tag_query, [cat_id])
  ])

  res.status(201).json(await response({ comment: comment, tag: tag }));
});

export default catRouter;
