

const User = require ('../models/User');

// const user_login =(req, res) =>{
//     User.findOne({email: req.body.email, password: req.body.password}, function (err, user){
//         if (err){
//             console.log (err);
//             return res.status(500).redirect ('/');
//         }

//         if (!user){
//             return res.status(404).redirect ('/');
//         }

//         return res.status(200).redirect ('/');
//     })
// }

// const user_signup = (req, res) => {
//     var newUser = new User ();
//     var email = req.body.email;
//     var password = req.body.password;
//     var lastName = req.body.lastName;
//     var firstName = req.body.firstName;

//     newUser.email = email;
//     newUser.password = password;
//     newUser.lastName = lastName;
//     newUser.firstName = firstName;

//     console.log (newUser);

//     newUser.save()
//         .then((result) => {
//             res.redirect ('/viewaccount');
//         })
//         .catch ((err) => {
//             console.log (err);
//         })
// };

// module.exports = {
//     user_signup,
//     user_login
// }