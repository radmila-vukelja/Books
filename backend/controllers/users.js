const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();


exports.signUp = (req, res, next) => {
    bcrypt.hash(req.body.password, 8)
    .then(hash => {
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            username: req.body.username,
            password: hash,
            role: 'guest'
        })
    user.save()
    .then(result => {
        res.status(201).json({
            message: "User signed up successfully",
            result: result
        })
    }).catch(error => {
        res.status(500).json({
            message: "Signing up failed. " + error
        })
    })
})
};

exports.login = (req, res, next) => {
    let fetchedUser;
    User.findOne({
        username: req.body.username
    })
    .then(user => {
        if(!user) {
            return res.status(401).json({
                message: "No user with provided username"
            })
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
        if(!result) {
            return res.status(401).json({
                message: "Wrong password, bro"
            })
        }
        const token = jwt.sign(
            {username: fetchedUser.username, userId: fetchedUser._id},
            "der-sumstuff-secrecy",
            {expiresIn: "1h"},
            { role: fetchedUser.role }
        );
        console.log(fetchedUser)
        res.status(200).json({
            token: token,
            expiresIn: 3600,
            userId: fetchedUser._id,
            role: fetchedUser.role
        })
    }).catch(error => {
        console.log(token)
        return res.status(500).json({
            message: "Login failed"
        })
    })
};

