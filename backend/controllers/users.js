const User = require('../models/user');
//const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.signUp = (req, res, next) => {
    bcrypt.hash(req.body.password, 8)
    .then(hash => {
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            username: req.body.username,
            password: hash
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

        return res.status(200).json({
            message: "Logged in!"
        })
    }).catch(error => {
        console.log(token)
        return res.status(500).json({
            message: "Login failed"
        })
    })
};

/*
 const token = jwt.sign(
            {
                username: fetchedUser.username, userId: fetchedUser._id
            },
            process.env.JWT_KEY,
            { expiresIn: "1h"}
        );
        res.status(200).json({
            token: token,
            expriresIn: 3600,
            userId: fetchedUser._id
        })

*/