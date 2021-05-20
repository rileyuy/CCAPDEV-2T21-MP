var mongoose = require('mongoose');
const User = require ('../models/User');
var Recipe = mongoose.model('Recipe')
var Comment = mongoose.model('Comment')
// const { json } = require('express');

const updateRating = async (req, res, next) => {
    var update;
    const recipes = JSON.parse(JSON.stringify(await Recipe.find({})));

    for (var key in recipes){
        console.log ("-------------CURRENTLY UPDATING: " + recipes[key].recipeName + " with ID " + recipes[key]._id);
        try{
            const comments = await Comment.find({ recipeId: recipes[key]._id }).populate('userId')
            const parsedComments = JSON.parse(JSON.stringify(comments));

            var i;
            var averageRating = 0;
            console.table (parsedComments);
            if (parsedComments.length != 0) {
                while (i < parsedComments.length) {
                    averageRating += parsedComments[i].rating;
                    i++;
                }
                averageRating /= i;
                console.log ("average rating is now: " + averageRating);
                update = {rating : averageRating};
                console.log (update);
            } else {
                console.log ("RATING IS NULL!");
                update = {rating : null};
            }
            i=0;
            console.log ("DING!")
            const recipe = await Recipe.findOneAndUpdate ({_id: recipes[key]._id}, update, {new: true, useFindAndModify: false});
            console.log ("updated " + recipe.recipeName + " with average rating " + recipe.rating);
        }
        catch (err){
            console.log (err);
        }
        
    }
    next()
}

module.exports = {
    updateRating
};
           


            
            
            
        
      
            
        
