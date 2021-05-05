const User = require ('../models/User');
const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');
const express = require('express');
const dotenv = require ('dotenv');
const saltrounds = 10;

dotenv.config();
const jwtsecret = process.env.JWTSECRET;

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

        newUser.save()
            .then(user => {
                res.redirect ('/login/registered');
            })
            .catch (err => {
                console.log (err);
            })
    })
}

const user_login  = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    
    User.findOne({$or: [{email}]}).lean()
    .then (user => {
        if (user){
            bcrypt.compare(password, user.password, function (err, result){
                if (err){
                    res.json ({
                        error:err
                    })
                }
                if (result){
                    let token = jwt.sign({id: user._id}, jwtsecret, {expiresIn: '1h'})
                    
                    const cookieOptions = {
                        httpOnly: true
                    };
                    
                    cookieOptions.secure = true;
                    res.cookie("jwt", token, cookieOptions);
                    res.redirect ('/');
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

const user_logout = (req, res, next) =>{
    res.cookie ('jwt', '', {maxAge: 1});
    res.redirect ('/');
}

module.exports={
    user_register,
    user_login,
    user_logout
}