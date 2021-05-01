const express = require('express');
const viewController = require ('../controllers/viewController');
//const upload = require ('../middleware/multer');
const {authenticate, checkUser} = require ('../middleware/authenticate')

const router = express.Router();

router.get ('/', viewController.about_view);
router.get ('/login', viewController.login_view);
router.get ('/register', viewController.register_view);
router.get ('/viewrecipe', viewController.view_recipe_view);
router.get ('/editrecipe/:id', viewController.edit_recipe_view); //must have redirect to login if no account is logged in
router.get ('/editaccount/:id', viewController.edit_account_view); //must have redirect to login if no account is logged in
// router.get ('/viewaccount', viewController.view_account_redirect); //redirects to logged in user viewaccount, else go to login
router.get ('/viewaccount/:id', viewController.view_account_view); //must have redirect to login if no account is logged in
router.get ('/uploadrecipe', viewController.upload_recipe_view) //must have redirect to login if no account is logged in
router.get ('/shoppinglist', viewController.shopping_list_view); //must have redirect  to login if no account is logged in

module.exports = router;