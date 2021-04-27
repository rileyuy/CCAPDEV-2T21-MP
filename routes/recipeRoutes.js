const express = require('express');
const Recipe = require ('../models/recipe');
const upload = require ('../middleware/multer');
const recipeController = require ('../controllers/recipeController');

const router = express.Router();

router.get ('/recipes', recipeController.recipe_index);
router.post ('/recipes', upload.single("filename"), (req, res) => {
    const recipe = new Recipe (req.body);

    //console.log (recipe);

    recipe.save()
    .then((result) => {
        res.redirect ('/recipes');
    })
    .catch ((err) => {
        console.log (err);
    })

    console.log (req.body);
});//recipeController.recipe_create_post
router.get ('/all-recipes', recipeController.recipe_getAll);
router.get ('/single-recipe', recipeController.recipe_getSingle);


module.exports = router;