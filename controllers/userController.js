const User = require ('../models/User');
const bcrypt = require ('bcryptjs');
const saltrounds = 10;


const user_edit = (req, res) => {
    var id = req.params.id;

    User.findOne ({_id: id}, function (err, updateUser){
        if (err) {
            console.log (err)
            res.send();
        }
        else{
            if (!updateUser){ //if user is found in database
                res.send();
            }
            else {
                console.log (req.body);
                if (req.body.email){
                    updateUser.email = req.body.email;
                }

                if (req.body.password){
                    bcrypt.hash (req.body.password, saltrounds, function(error, hashedPass){
                        if (error){
                            console.log (error);
                            res.redirect('/');
                        }

                        updateUser.password = hashedPass;
                    })
                }

                if (req.body.firstName){
                    updateUser.firstName = req.body.firstName;
                }
                
                if (req.body.lastName){
                    updateUser.lastName = req.body.lastName;
                }

                updateUser.save (function(errors, updatedObject){
                    if (errors){
                        console.log (errors)
                        res.send();
                    }
                    else{
                        console.log (updatedObject);
                        res.redirect ('/');
                    }
                })
            }
        }
    })
}

const user_delete = (req, res) => {
    const id = res.locals.user.id;
    User.findByIdAndDelete (id)
        .then(result => {
            res.redirect('/logout');
        })
        .catch ((err) => {
            console.log (err);
        })
}

module.exports = {
    user_edit,
    user_delete
}