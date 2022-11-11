import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import http from 'http'
import https from 'https'
import fs from 'fs'

import userRouter from './routers/userRouter.js';
import authResult from './routers/authResult.js';
import locationRouter from './routers/locationRouter.js'

import { response, not_found, bad_response } from './modules/responseMSG.js';
import catRouter from './routers/catRouter.js';
import heartRouter from './routers/heartRouter.js';
import likeRouter from './routers/likeRouter.js';
import mypageRouter from './routers/mypageRouter.js';

const app = express();

let corsOptions = {
  origin: ['http://localhost:3008', 'http://172.31.28.56:3008', 'https://www.meowmeow.co.kr'],
  credentials: true
}

let options = {
};



app.use(express.json());

app.set('port', process.env.PORT || 3009);
app.use(cors(corsOptions));

// api develop part
app.use('/location', locationRouter);
app.use('/cat', catRouter)
app.use('/heart', heartRouter)
app.use('/like', likeRouter)
app.use('/user', userRouter);
app.use('/auth', authResult);
app.use('/mypage', mypageRouter);

// 404 Error Handling
app.use(async (req, res, next) => {
  res.status(404).json(await not_found());
});

app.use(async (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json(await bad_response());
});

// app.listen(app.get('port'), () => {
//   console.log(`server start : ${app.get('port')}`);
// });

http.createServer(app).listen('3009')

if (process.env.MODE === 'pro') {
  options = {
    key: fs.readFileSync('/etc/letsencrypt/live/www.meowmeow.co.kr/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/www.meowmeow.co.kr/cert.pem'),
    ca: fs.readFileSync('/etc/letsencrypt/live/www.meowmeow.co.kr/chain.pem')
  }
  https.createServer(options, app).listen('3010');
}

