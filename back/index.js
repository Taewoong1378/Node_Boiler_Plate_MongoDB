/* eslint-disable consistent-return */
const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

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
