/* eslint-disable consistent-return */
const express = require('express');
const dotenv = require('dotenv');

const app = express();
const port = 5000;

dotenv.config();
const mongoose = require('mongoose');
const registerRouter = require('./routes/register');

mongoose.connect(`${process.env.mongoURI}`)
    .then(() => {
        console.log('MongoDB connected!');
    })
    .catch((err) => {
        console.log(err);
    });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/register', registerRouter);

app.listen(port, () => {
    console.log(`${port}번 서버 실행중입니다!`);
});
