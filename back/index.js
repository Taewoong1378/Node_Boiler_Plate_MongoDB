/* eslint-disable consistent-return */
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const helmet = require('helmet');
const hpp = require('hpp');
const morgan = require('morgan');

const app = express();
const port = 5000;

dotenv.config();
const mongoose = require('mongoose');
const userRouter = require('./routes/user');

mongoose.connect(`${process.env.mongoURI}`)
    .then(() => {
        console.log('MongoDB connected!');
    })
    .catch((err) => {
        console.log(err);
    });

// CORS 문제 해결
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
  app.use(morgan('combined'));
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(hpp());
  app.use(cors({
    origin: '', // 배포된 프론트 서버 주소
    credentials: true,
  }));
} else {
  app.use(morgan('dev'));
  app.use(cors({
    origin: true,
    credentials: true,
  }));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/user', userRouter);

app.listen(port, () => {
    console.log(`${port}번 서버 실행중입니다!`);
});
