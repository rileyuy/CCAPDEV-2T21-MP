const Recipe = require ('../models/recipe');
const fs = require('fs');
var path = require('path');
//loads all recipes into recipes page

const recipe_index = (req, res) => {
    Recipe.find ()
    .then((result) => {
        res.render ("recipes", {
            title: 'Recipes | Eats Good!', 
            layout: 'page', 
            recipes: JSON.parse(JSON.stringify(result))
        });
    })
    .catch ((err) => {
        console.log (err);
    });
}

// const recipe_create_post = 
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
    recipe_index,
    //recipe_create_post,
    recipe_getSingle,
    recipe_getAll
  }