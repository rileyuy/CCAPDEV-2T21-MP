const User = require ('../models/User');
const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');
const e = require('express');

const saltrounds = 10;

const user_register = (req, res, next) => {
    bcrypt.hash (req.body.password, saltrounds, function(err, hashedPass){
        if (err){
            res.json({
                error: err
            })
        }
        
        let newUser = new User ();
        let email = req.body.email;
        let password = hashedPass;
        let lastName = req.body.lastName;
        let firstName = req.body.firstName;

        newUser.email = email;
        newUser.password = password;
        newUser.lastName = lastName;
        newUser.firstName = firstName;

        console.log (newUser);

        newUser.save()
            .then(user => {
                res.redirect ('/login');
            })
            .catch ((err) => {
                console.log (err);
            })
    })
}

const user_login  = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    
    User.findOne({$or: [{firstName:email}, {lastName:email}]})
    .then (user => {
        if (user){
            bcrypt.compare(password, user.password, function (err, result){
                if (err){
                    res.json ({
                        error:err
                    })
                }
                if (result){
                    let token = jwt.sign({email: user.email}, 'verySecretValue', {expiresIn: '1h'})
                    res.json ({
                        message: 'login successful!',
                        token
                    })
                }else{
                    res.json ({
                        message: 'password does not match!'
                    })
                }
            })
        }
        else{
            res.json({
                message: 'no user found!'
            })
        }
    })
}

module.exports={
    user_register,
    user_login
}