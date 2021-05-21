const User = require ('../models/user.js');
const Recipe = require ('../models/recipe.js');
const Comment = require ('../models/comment.js');
const bcrypt = require ('bcryptjs');
const saltrounds = 10;
const { check, validationResult } = require('express-validator');

const edit_user = (req, res) => {
    var id = req.params.id;

    User.findOne ({_id: id}, function (err, updateUser){
        if (err) {
            console.log (err)
            res.send();
        }
        else{
            if (!updateUser){ 
                res.send();
            }
            else {
                var errors = validationResult(req);
                console.log(errors.mapped());
                if (!errors.isEmpty()) {
                    console.log("errors")
                    return res.render('editaccount', { errors: errors.mapped() })
                }
                else{
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
                    });
                }

                
            }
        }
    })
}

const delete_user = async (req, res) => {
    const id = req.params.id;

    try{
        await User.findOneAndRemove ({_id: id});
        res.cookie ('jwt', '', {maxAge: 1});
        await Comment.deleteMany({userId: id});
        await Recipe.deleteMany ({userId: id});
    }
    catch (err) {
        console.log (err);

    }
    res.redirect ('/');
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
    // console.table(req.body)
    // console.log(id)
    User.collection.updateOne ({
        _id: id
    }, {
        $pull: { shoppingList: deleteInfo }
    },{upsert:false, multi: true} )

    res.redirect ('back');
}

module.exports = {
    edit_user,
    delete_user,
    add_to_shopping_list,
    delete_from_shopping_list
}