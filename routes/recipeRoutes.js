const express = require('express');
const Recipe = require ('../models/recipe');
const upload = require ('../middleware/multer');
const recipeController = require ('../controllers/recipeController');
const viewController = require ('../controllers/viewController');

const router = express.Router();

router.get ('/viewrecipe/:id', recipeController.recipe_page);

router.get ('/recipes', viewController.recipe_view);

router.post ('/recipes', upload.single("filename"), (req, res) => {
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
});
router.get ('/all-recipes', recipeController.recipe_getAll);
router.get ('/single-recipe', recipeController.recipe_getSingle);


module.exports = router;