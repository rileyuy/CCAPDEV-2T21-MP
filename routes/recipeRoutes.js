const multer = require('multer');
 
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--'+ file.originalname)
    }
});
 
const upload = multer({ storage: fileStorage });

const express = require('express');

const recipeController = require ('../controllers/recipeController');

const router = express.Router();

router.get ('/recipes', recipeController.recipe_index);
router.post ('/recipes', upload.single("filename"), recipeController.recipe_create_post);
router.get ('/all-recipes', recipeController.recipe_getAll);
router.get ('/single-recipe', recipeController.recipe_getSingle);


module.exports = router;