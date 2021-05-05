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
                if (req.body.email) {
                    updateUser.email = req.body.email;
                }
                
                if (req.body.password){
                    updateUser.password = bcrypt.hashSync(req.body.password, saltrounds)
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
                        res.redirect ('/');
                    }
                })
            }
        }
    })
}

const user_delete = (req, res) => {
    const id = req.params.id;
    User.findOneAndRemove ({_id:id}, function (err){
        if (err){
            console.log (err);
        }
        else{
            res.cookie ('jwt', '', {maxAge: 1});
            res.redirect ('/');
        }
    });
}

module.exports = {
    user_edit,
    user_delete
}