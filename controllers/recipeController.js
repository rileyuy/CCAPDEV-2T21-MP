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

const recipe_create_post = (req, res) => {
    const recipe = new Recipe (req.body);

    // const recipe = new Recipe ({
    //     recipeName: req.body.recipeName,
    //     recipeIngredients: req.body.recipeIngredients,
    //     recipeInstructions: req.body.recipeInstructions,
    //     img: {
    //         data: fs.readFileSync(path.join(__dirname + '/public/uploads/' + req.file.filename)),
    //         contentType: 'image/png'
    //     }
    // });
    console.log (recipe);

    recipe.save()
    .then((result) => {
        res.redirect ('/recipes');
    })
    .catch ((err) => {
        console.log (err);
    })
    


    console.log (req.body);
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
    recipe_index,
    recipe_create_post,
    recipe_getSingle,
    recipe_getAll
  }