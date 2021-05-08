const Recipe = require ('../models/recipe');
const Comment = require ('../models/comment');
const { json } = require('express');

const upload_recipe = (req, res) => { 
    let recipeJSON = {...req.body}
    recipeJSON.img = req.file.filename
    const recipe = new Recipe (recipeJSON);

    recipe.save()
    .then((result) => {
        res.redirect ('/recipes');
    })
    .catch ((err) => {
        console.log (err);
    })
};

const edit_recipe = async (req, res) => {
    var recipeId = req.params.id;
    console.table (req.body);

    if (req.body.recipeName) {
        let update = {recipeName : req.body.recipeName}
        await Recipe.findOneAndUpdate( {_id: recipeId}, update, {useFindAndModify: false});
    }
    
    if (req.body.recipeIngredients){
        let update = {recipeIngredients : req.body.recipeIngredients}
        await Recipe.findOneAndUpdate( {_id: recipeId}, update, {useFindAndModify: false}); 
    }
    
    if (req.body.recipeInstructions){
        let update = {recipeInstructions : req.body.recipeInstructions}
        await Recipe.findOneAndUpdate( {_id: recipeId}, update, {useFindAndModify: false});
    }
    
    res.redirect ('/');

    // Recipe.findOne ({_id: recipeId}, function (err, updateRecipe){
    //     if (err) {
    //         console.log (err)
    //         res.send();
    //     }
    //     else{
    //         if (!updateRecipe) {
    //             res.send();
    //         }
    //         else {
                // if (req.body.recipeName) {
                //     updateRecipe.recipeName = req.body.recipeName;
                // }
                
                // if (req.body.recipeIngredients){
                //     updateRecipe.recipeIngredients = req.body.recipeIngredients;
                // }
                
                // if (req.body.recipeInstructions){
                //     updateRecipe.recipeInstructions = req.body.recipeInstructions;
                // }

    //             // updateRecipe.save (function(errors, updatedRecipe){
    //             //     if (errors){
    //             //         console.log (errors)
    //             //         res.send();
    //             //     }
    //             //     else{
    //             //         res.redirect ('/');
    //             //     }
    //             // })

    //             Recipe.updateOne({_id: recipeId}, updateRecipe, options)
    //                 .then(replacedRecipe => {
    //                     console.log ("Successfully edited recipe with id: "+ replacedRecipe._id);
    //                     res.redirect ('/');
    //                 })
    //                 .catch(errors => {
    //                     console.log (errors);
    //                 })
    //         }
    //     }
    // })
}

const delete_recipe = (req, res) => {
    const id = req.params.id;
    Recipe.findOneAndRemove ({_id:id}, function (err){
        if (err){
            console.log (err);
        }
        else{
            res.redirect ('/recipes');
        }
    });
}

const recipe_page = (req, res) => {
    let id = req.params.id;

    if (res.locals.user){
        Recipe.findById(id).populate ('userId')
        .then(result => {
            console.log (result);
            Comment.find ({recipeId: result._id}).populate ('userId')
            .then (userComments => {
                const parsedComments = JSON.parse(JSON.stringify(userComments));
                let personalComment;
                var i = 0;
                var averageRating = 0.0;
                let userHasComment = false;

                console.table (parsedComments)
                console.log(userHasComment)

                if (parsedComments.length != 0) {
                    while (i < parsedComments.length) {
                        averageRating += parsedComments[i].rating;
                        console.log ("averageRating = " + averageRating + "\nparsedComments.rating = " + parsedComments.rating + "\n\n");
                        i++;
                    }

                    averageRating /= i; 
                    console.log ("avg rating = " + averageRating);
                    
                    var j = 0;

                    while (j < parsedComments.length){
                        console.log (typeof parsedComments[j].userId._id + "\n" + typeof JSON.stringify(res.locals.user._id) + "\n\n")

                        if ((parsedComments[j].userId._id).localeCompare(JSON.stringify(res.locals.user._id))){
                            userHasComment = true;
                            personalComment = parsedComments[j];
                        }

                        j++;
                    }
                   
                } else {
                    averageRating = 5;
                    console.log(userHasComment)
                }
                //console.table (personalComment);
                res.render('viewrecipe', {
                    title: 'View Recipe | Eats Good!', 
                    layout: 'page', 
                    recipe: JSON.parse(JSON.stringify(result)),
                    averageRating: parseFloat (averageRating),
                    userComments: parsedComments,
                    userHasComment: userHasComment,
                    personalComment: personalComment
                 });
            })
            .catch(err=>{
                console.log(err);
            })
        })
        .catch((err) => {
            console.log(err);
        })
    }
    else{
        res.redirect ('../login');
    }
}

const recipe_getSingle = (req, res) => {
    Recipe.findById()
    .then((result) => {
        res.send (result)
    })
    .catch ((err) => {
        console.log (err);
    });
}

const recipe_getAll = (req, res) => {
    Recipe.find()
    .then((result) => {
        res.send (result);
    })
    .catch ((err) => {
        console.log (err);
    });
}

module.exports = {
    recipe_getSingle,
    recipe_getAll,
    recipe_page,
    edit_recipe,
    delete_recipe,
    upload_recipe
  }