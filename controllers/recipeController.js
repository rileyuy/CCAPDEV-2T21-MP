const Recipe = require ('../models/recipe');

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
    recipe_page
  }