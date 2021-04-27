const express = require('express');
const Recipe = require ('../models/recipe');
const upload = require ('../middleware/multer');
const recipeController = require ('../controllers/recipeController');

const router = express.Router();

router.get ('/recipes', recipeController.recipe_index);
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

//recipeController.recipe_create_post
router.get ('/all-recipes', recipeController.recipe_getAll);
router.get ('/single-recipe', recipeController.recipe_getSingle);


module.exports = router;