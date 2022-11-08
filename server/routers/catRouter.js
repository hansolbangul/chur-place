import express from 'express';
import authUtil from '../modules/auth.js';
import multer from 'multer';

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../front/src/uploads/') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getFullYear() + new Date().getMonth() + new Date().getSeconds() + '_' + file.originalname.split('_').join('')) // cb 콜백함수를 통해 전송된 파일 이름 설정
  }
})
// const upload = multer({ dest: 'uploads' });
const upload = multer({ storage: storage })

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

  query = 'select name, type_id from cat left join type on cat.type = type.type_id where cat.cat_id = ?'

  const [cat] = await pool.query(query, [rows.insertId]);

  if (rows.insertId) {
    res.status(201).json(await response({ ...cat[0], cat_id: rows.insertId }));
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

catRouter.post('/image/:id', upload.array('img'), async (req, res, next) => {
  // catRouter.post('/image', (req, res, next) => {
  const cat_id = req.params.id
  const imageQuery = []
  try {
    req.files.forEach((item) => {
      imageQuery.push(`insert into image (cat_id, path) value (${cat_id}, '${item.filename}')`)
    })

    await Promise.all(imageQuery.map(item => pool.query(item)))
    res.status(201).json(await response());
  } catch (error) {
    console.log(error)
    res.json(await not_response(error))
  }

});

export default catRouter;
