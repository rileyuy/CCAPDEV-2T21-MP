const jwt = require ('jsonwebtoken')
const User = require ('../models/User');
const dotenv = require ('dotenv');
const { promisify } = require("util");
dotenv.config();
const jwtsecret = process.env.JWTSECRET;

const  authenticate = async(req, res, next) => {
    try{
        if (req.cookies.jwt){
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, jwtsecret);
            const newUser = await (User.findOne({email: decoded.email}).lean());
            console.log (newUser);
            if (!newUser) {
                return next();
            }
            res.locals.user = newUser;  
            
    
        }
        next()
        
    }
    catch (error){
        res.json({
            message: 'Authetication failed!'
            ,error
        })
        
    }
}

module.exports = authenticate