/* eslint-disable consistent-return */
const express = require('express');
const { User } = require('../models/User');
const { auth } = require('./middlewares');

const router = express.Router();

router.post('/register', (req, res) => {
    const user = new User(req.body);
    // eslint-disable-next-line consistent-return
    // eslint-disable-next-line no-unused-vars
    user.save((err, userInfo) => {
        if (err) {
            return res.json({
                success: false,
                err,
            });
        }
        return res.status(200).json({
            success: true,
        });
    });
});

router.post('/login', (req, res) => {
    // 요청된 이메일을 데이터베이스에서 있는지 찾는다.
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: '제공된 이메일에 해당하는 유저가 없습니다.',
            });
        }

        // eslint-disable-next-line no-shadow
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) {
                return res.json({ 
                    loginSuccess: false,
                    message: '비밀번호가 틀렸습니다.', 
                });
            }
            // 비밀번호까지 맞다면 토큰을 생성하기.
            user.generateToken((error, userInfo) => {
                if (error) {
                    res.status(400).send(error);
                } else {
                    // 토큰을 저장한다. 어디에? 쿠키 OR 로컬스토리지
                    // x_auth는 쿠키의 이름이다.
                    res.cookie('x_auth', userInfo.token)
                    .status(200)
                    .json({
                        loginSuccess: true,
                        userId: user._id,
                    });
                }
            });
        });
    });
});

router.post('/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, {
        token: '',
    }, (err) => {
        if (err) {
            res.json({
                success: false,
                err,
            });
        } else {
            res.status(200).send({
                success: true,
            });
        }
    });
});

module.exports = router;
