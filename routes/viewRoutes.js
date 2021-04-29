const express = require('express');
const viewController = require ('../controllers/viewController');
//const upload = require ('../middleware/multer');
const {authenticate, checkUser} = require ('../middleware/authenticate')

const router = express.Router();

router.get ('/', viewController.about_view);
router.get ('/login', viewController.login_view);
router.get ('/register', viewController.register_view);
router.get ('/editaccount', authenticate, viewController.edit_account_view);
router.get ('/editrecipe', viewController.edit_recipe_view);
router.get ('/viewrecipe', viewController.view_recipe_view);
router.get ('/viewaccount/:id',authenticate, viewController.view_account_view);
router.get ('/uploadrecipe', authenticate, viewController.upload_recipe_view)
router.get ('/shoppinglist', authenticate, viewController.shopping_list_view);

module.exports = router;