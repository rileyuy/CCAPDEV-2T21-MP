const Recipe = require ('../models/recipe');
const Comment = require ('../models/comment');
const { json } = require('express');
var moment = require('moment')

async function updateDate (result, update){
    await Recipe.findOneAndUpdate ({_id : result._id}, update, {useFindAndModify: false});
}

const upload_recipe = (req, res) => { 
    let recipeJSON = {...req.body}
    recipeJSON.img = req.file.filename
    const recipe = new Recipe (recipeJSON);
    
    recipe.save()
    .then((result) => {
        var formattedDate = moment(result.createdAt).format('MM-DD-YYYY');
        let update = {createdDate : formattedDate.toString()}
        updateDate (result, update);
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
}

const delete_recipe = async (req, res) => {
    const id = req.params.id;

    try{
        await Recipe.findOneAndRemove ({_id:id});
        await Comment.deleteMany ({recipeId: id});
        res.redirect ('/recipes');
    }
    catch (err){
        console.log (err);
        res.redirect ('/');
    }
}

const recipe_page = (req, res) => {
    let id = req.params.id;

    if (res.locals.user){
        Recipe.findById(id).populate ('userId')
        .then(result => {
            Comment.find ({recipeId: result._id}).populate ('userId')
            .then (userComments => {
                const parsedComments = JSON.parse(JSON.stringify(userComments));
                let personalComment;
                var i = 0;
                let userHasComment = false;

                // console.table (parsedComments)
                // console.log(userHasComment)

                if (parsedComments.length != 0) {
                    var j = 0;

                    while (j < parsedComments.length){
                        
                        var parsedTemp1 = JSON.stringify(res.locals.user._id);
                        const unquotedParsed1 = parsedTemp1.replace(/"([^"]+)":/g, '$1:');
                        var parsedTemp2 = JSON.stringify(parsedComments[j].userId._id)
                        const unquotedParsed2 = parsedTemp2.replace(/"([^"]+)":/g, '$1:');
                        console.log (unquotedParsed1 + " "+ unquotedParsed2)
                        if (unquotedParsed1 == unquotedParsed2){
                            console.log ("user has a comment!");
                            userHasComment = true;
                            personalComment = parsedComments[j];
                        }

                        j++;
                    }
                }

                res.render('viewrecipe', {
                    title: 'View Recipe | Eats Good!', 
                    layout: 'page', 
                    recipe: JSON.parse(JSON.stringify(result)),
                    userComments: parsedComments,
                    userHasComment: userHasComment,
                    personalComment: personalComment
                 });
            })
            .catch(err=>{
                res.render ('404');
                console.log (err);
            })
        })
        .catch((err) => {
            res.render ('404');
            console.log (err);
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