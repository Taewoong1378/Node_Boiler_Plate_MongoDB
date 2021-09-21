/* eslint-disable consistent-return */
const express = require('express');
const { User } = require('../models/User');

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

module.exports = router;
