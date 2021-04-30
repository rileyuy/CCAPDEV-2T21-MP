const Recipe = require ('../models/recipe');

const edit_recipe = (req, res) => {
    var recipeId = req.params.id;
    User.findOne ({_id: recipeId}, function (err, updateRecipe){
        if (err) {
            console.log (err)
            res.send();
        }
        else{
            if (!updateRecipe){ //if recipe is found in database
                res.send();
            }
            else {
                console.log (req.body);
                if (req.body.recipeName) {
                    updateRecipe.recipeName = req.body.recipeName;
                }
                
                if (req.body.recipeIngredients){
                    updateRecipe.recipeIngredients = req.body.recipeIngredients;
                }
                
                if (req.body.recipeInstructions){
                    updateRecipe.recipeInstructions = req.body.recipeInstructions;
                }

                updateRecipe.save (function(errors, updatedRecipe){
                    if (errors){
                        console.log (errors)
                        res.send();
                    }
                    else{
                        console.log (updatedRecipe);
                        res.redirect ('/');
                    }
                })
            }
        }
    })
}

const delete_recipe = (req, res) => {

}

const recipe_page = (req, res) => {
    let id = req.params.id;
    Recipe.findById(id)
        .then(result => {
            res.render('viewrecipe', {
                title: 'View Recipe | Eats Good!', 
                layout: 'page', 
                recipe: JSON.parse(JSON.stringify(result))
            });
        })
        .catch((err) => {
            console.log(err);
        })
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
    delete_recipe
  }