const express = require('express');
const Recipe = require ('../models/recipe');
const upload = require ('../middleware/multer');
const recipeController = require ('../controllers/recipeController');
const viewController = require ('../controllers/viewController');

const router = express.Router();

router.post ('/uploadrecipes', upload.single("filename"), recipeController.upload_recipe);

router.put ('/editrecipe/:id/update', recipeController.edit_recipe);

router.get ('/deleterecipe/:id', recipeController.delete_recipe);
router.get ('/viewrecipe/:id', recipeController.recipe_page);
router.get ('/recipes', viewController.recipe_view);
router.get ('/all-recipes', recipeController.recipe_getAll);
router.get ('/single-recipe', recipeController.recipe_getSingle);


module.exports = router;