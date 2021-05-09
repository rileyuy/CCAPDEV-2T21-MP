const User = require ('../models/User');
const bcrypt = require ('bcryptjs');
const saltrounds = 10;

const edit_user = (req, res) => {
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

const delete_user = (req, res) => {
    const id = req.params.id;
    User.findOneAndRemove ({_id: id}, function (err){
        if (err){
            console.log (err);
        }
        else{
            res.cookie ('jwt', '', {maxAge: 1});
            res.redirect ('/');
        }
    });
}

const add_to_shopping_list = (req, res) => {
    const shoppingListInfo = req.body;
    const id = res.locals.user._id;

    console.log(req.body)
    console.log(id)

    User.collection.updateOne ({
        _id: id
    }, {
        $addToSet: { shoppingList: shoppingListInfo }
    })

    res.redirect ('back');
}

const delete_from_shopping_list = (req, res) =>{
    const deleteInfo = req.body;
    const id = res.locals.user._id;
    User.collection.updateOne ({
        _id: id
    }, {
        $pull: { shoppingList: deleteInfo }
    },{upsert:false, multi: false} )

    res.redirect ('back');
}

module.exports = {
    edit_user,
    delete_user,
    add_to_shopping_list,
    delete_from_shopping_list
}