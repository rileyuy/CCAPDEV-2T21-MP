const jwt = require ('jsonwebtoken')
const User = require ('../models/user.js');
const dotenv = require ('dotenv');
const { promisify } = require("util");

dotenv.config();
const jwtsecret = process.env.JWTSECRET;

const authenticate = async(req, res, next) => {
    try{
        if (req.cookies.jwt){
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, jwtsecret);
            const newUser = await (User.findOne({_id: decoded.id}).lean());
            if (!newUser) {
              res.redirect ('/');
              return next();
            }
            res.locals.user = newUser;  
        }
        next()
    }
    catch (error){
        res.redirect ('/login');
    }

}

module.exports = {
    authenticate
};