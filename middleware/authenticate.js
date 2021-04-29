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
            const newUser = await (User.findOne({email: decoded.email}).lean());
            console.log ("newUser: "+ newUser);
            if (!newUser) {
              console.log ("INSIDE !NEWUSER");
              res.redirect ('/');
              return next();
            }
            res.locals.user = newUser;  
        }
        else{
          throw "no cookies! owo"
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
      console.log ("TOKEN EXISTS!");
      jwt.verify(token, jwtsecret , async (err, decodedToken) => {
        console.log ("IN JWT VERIFY!");
        if (err) {
          console.log ("USER IS NULL!");
          res.locals.user = null;
          next();
        } else {
          console.log ("USER IS NOT NULL!");
          let user = await User.findById(decodedToken.id);
          res.locals.user = user;
          next();
        }
      });
    } else {
      console.log ("CHECKUSER FAILED!");
      res.locals.user = null;
      next();
    }
  };

module.exports = {
    checkUser,
    authenticate
};