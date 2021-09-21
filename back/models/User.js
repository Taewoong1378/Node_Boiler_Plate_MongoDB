const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
    },
    email: {
        type: String,
        trim: true,
        unique: 1,
    },
    password: {
        type: String,
        minlength: 5,
    },
    lastname: {
        type: String,
        maxlength: 50,
    }, 
    role: {
        type: Number,
        default: 0,
    },
    image: String,
    tokne: {
        type: String,
    },
    tokenExp: {
        type: Number,
    },
});

userSchema.pre('save', function (next) {
    const user = this;

    // 비밀번호를 암호화시킨다.
    if (user.isModified('password')) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
                next(err);
            }        
            bcrypt.hash(user.password, salt, (error, hash) => {
                if (error) {
                    next(error);
                } else {
                    user.password = hash;
                    next();
                }
            });
        });        
    }
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
