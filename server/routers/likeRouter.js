import express from 'express';
import authUtil from '../modules/auth.js';

import { response, not_found, bad_response, not_response } from '../modules/responseMSG.js';

const likeRouter = express.Router();
import _pool from '../modules/database.js';
const pool = _pool();

let query = '';

likeRouter.get('/', async (req, res, next) => {
  query =
    'select * from member_to_like';
  const [data] = await pool.query(query);

  if (data.length > 0) {
    res.status(201).json(await response(data));
  } else {
    res.json(await not_found());
  }
});

likeRouter.get('/:id', async (req, res, next) => {
  const cat_id = req.params.id
  try {
    query =
      'select * from member_to_like where cat_id = ? and member_id = ?';

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

likeRouter.patch('/', async (req, res, next) => {
  const body = req.body;
  try {
    query = 'select * from member_to_like where cat_id = ? and member_id = ?'

    const [rows] = await pool.query(query, [body.cat_id, 1]);

    if (rows.length > 0) {
      query = 'delete from member_to_like where id = ?'
      await pool.query(query, [rows[0].id]);
    } else {
      query = 'insert into member_to_like (cat_id, member_id) values (?, ?)'
      await pool.query(query, [body.cat_id, 1]);
    }

    res.status(201).json(await response(rows.length > 0 ? false : true));
  } catch (error) {
    res.json(await not_response(error));
  }

});

likeRouter.get('/best', async (req, res, next) => {
  try {
    query = `
      select l.cat_id, count(*) as count, c.age, c.gender, c.create_date from member_to_like as l 
      left join cat as c on c.cat_id = l.cat_id
      group by cat_id order by count desc
    `

    const [data] = await pool.query(query);

    if (data.length > 0) {
      res.status(201).json(await response(data));
    } else {
      res.status(201).json(await response(false));
    }
  } catch (error) {
    res.json(await not_response(error));
  }
})

export default likeRouter;
