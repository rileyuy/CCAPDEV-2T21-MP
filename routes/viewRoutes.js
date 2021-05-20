const express = require('express');
const viewController = require ('../controllers/viewController');
//const upload = require ('../middleware/multer');
const {authenticate} = require ('../middleware/authenticate')
const { check, validationResult } = require('express-validator');

const router = express.Router();

router.get ('/', viewController.about_view);
router.get ('/login', viewController.login_view);
router.get ('/register', viewController.register_view);
router.get ('/editrecipe/:id', viewController.edit_recipe_view); //must have redirect to login if no account is logged in
router.get ('/editaccount/:id',[check ('email', 'Please enter a valid email address.').isEmail(),
                                check ('password', 'Please enter a password.').not().isEmpty(),
                                check ('lastName', 'Please enter your last name.').not().isEmpty(),
                                check ('firstName', 'Please enter your first name.').not().isEmpty()], viewController.edit_account_view); //must have redirect to login if no account is logged in
router.post ('/recipes/search', viewController.searched_recipe_view);
router.get ('/viewaccount/:id', viewController.view_account_view); //must have redirect to login if no account is logged in
router.get ('/uploadrecipe', viewController.upload_recipe_view) //must have redirect to login if no account is logged in
router.get ('/shoppinglist', viewController.shopping_list_view); //must have redirect  to login if no account is logged in

module.exports = router;