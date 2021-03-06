const User = require ('../models/user.js');
const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');
const express = require('express');
const dotenv = require ('dotenv');
const { check, validationResult } = require('express-validator');
const saltrounds = 10;

dotenv.config();
const jwtsecret = process.env.JWTSECRET;


const user_register = (req, res, next) => {
    bcrypt.hash (req.body.password, saltrounds, function(err, hashedPass){
        // if (err){
        //     res.json({
        //         error: err
        //     })
        // }
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.mapped());
            console.log("errors")
            res.render('register', {title: 'Register | Eats Good!', layout: 'page', errors: errors.mapped() })
        }else{
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
                .catch (errs => {
                    console.log (errs);
                });
        }
    });
}

const user_login  = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    var errors = validationResult(req);
    console.log(errors.mapped());
    if (!errors.isEmpty()) {
        console.log(errors.mapped());
        console.log("errors")
        return res.render('login', { errors: errors.mapped() })
    }
    else{
        User.findOne({$or: [{email}]}).lean()
        .then (user => {
            if (user){
                bcrypt.compare(password, user.password, function (err, result){
                    if (result){
                        let token = jwt.sign({id: user._id}, jwtsecret, {expiresIn: '1d'})
                        
                        const cookieOptions = {
                            httpOnly: true
                        };
                        
                        cookieOptions.secure = true;
                        res.cookie("jwt", token, cookieOptions);
                        
                        res.redirect ('/recipes');
                    }else{
                        res.redirect ('/login/wrongpass'); 
                    }
                });
            }
            else{
                res.redirect ('/login/wrongemail');
            }
        });
    }
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