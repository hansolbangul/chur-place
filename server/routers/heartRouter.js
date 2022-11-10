import express from 'express';
import authUtil from '../modules/auth.js';

import { response, not_found, bad_response, not_response } from '../modules/responseMSG.js';

const heartRouter = express.Router();
import _pool from '../modules/database.js';
const pool = _pool();

let query = '';

heartRouter.get('/', async (req, res, next) => {
  query =
    'select * from member_to_heart';
  const [data] = await pool.query(query);

  if (data.length > 0) {
    res.status(201).json(await response(data));
  } else {
    res.json(await not_found());
  }
});

heartRouter.get('/:id', async (req, res, next) => {
  const cat_id = req.params.id
  try {
    query =
      'select * from member_to_heart where cat_id = ? and member_id = ?';

    const [data] = await pool.query(query, [cat_id, 1]);

    if (data.length > 0) {
      res.status(201).json(await response(true));
    } else {
      res.status(201).json(await response(false));
    }
  } catch (error) {
    res.json(await not_response(error));
  }
});

heartRouter.patch('/', async (req, res, next) => {
  const body = req.body;
  try {
    query = 'select * from member_to_heart where cat_id = ? and member_id = ?'

    const [rows] = await pool.query(query, [body.cat_id, 1]);

    if (rows.length > 0) {
      query = 'delete from member_to_heart where id = ?'
      await pool.query(query, [rows[0].id]);
    } else {
      query = 'insert into member_to_heart (cat_id, member_id) values (?, ?)'
      await pool.query(query, [body.cat_id, 1]);
    }

    res.status(201).json(await response(rows.length > 0 ? false : true));
  } catch (error) {
    res.json(await not_response(error));
  }

});

heartRouter.post('/comment/:id', async (req, res, next) => {
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

heartRouter.get('/type', async (req, res, next) => {

  query =
    'select * from type';
  const [data] = await pool.query(query);

  if (data.length > 0) {
    res.status(201).json(await response(data));
  } else {
    res.json(await not_found());
  }
});

heartRouter.get('/tag', async (req, res, next) => {

  query =
    'select * from tag';
  const [data] = await pool.query(query);

  if (data.length > 0) {
    res.status(201).json(await response(data));
  } else {
    res.json(await not_found());
  }
});

heartRouter.get('/:id', async (req, res, next) => {
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

export default heartRouter;
