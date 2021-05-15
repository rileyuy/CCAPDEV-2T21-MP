const jwt = require ('jsonwebtoken')
const User = require ('../models/User');
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

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
      jwt.verify(token, jwtsecret , async (err, decodedToken) => {
        
        if (err) {
          res.locals.user = null;
          next();
        } else {
          let user = await User.findById(decodedToken.id);
          res.locals.user = user;
          next();
        }
      });
    } else {
      res.locals.user = null;
      next();
    }
  };

module.exports = {
    checkUser,
    authenticate
};