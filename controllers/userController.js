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
                
                // if (req.body.password){
                //     bcrypt.hash (req.body.password, saltrounds, function(error, hashedPass){
                        
                //         if (error){
                //             console.log (error);
                //             res.redirect('/');
                //         }
                //         console.log ("hashed pass " + hashedPass);
                //         console.log ("req.body.password " + req.body.password);
                //         updateUser.password = hashedPass;
                //     });

                    bcrypt.compare(req.body.password, updateUser.password, function(error, result) {
                        if (result){
                            bcrypt.hash (req.body.password, saltrounds, function(errors, hashedPass){
                        
                                if (error){
                                    console.log (error);
                                    res.redirect('/');
                                }
                                console.log ("hashed pass " + hashedPass);
                                console.log ("req.body.password " + req.body.password);
                                updateUser.password = hashedPass;
                            });
                        }
                    });
                // }

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
    console.log (req.params.id);
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