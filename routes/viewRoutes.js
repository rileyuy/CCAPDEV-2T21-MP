const express = require('express');
const viewController = require ('../controllers/viewController');
//const upload = require ('../middleware/multer');

const router = express.Router();

router.get ('/', viewController.about_view);
router.get ('/login', viewController.login_view);
router.get ('/register', viewController.register_view);
router.get ('/editaccount', viewController.edit_account_view);
router.get ('/viewaccount', viewController.view_account_view);
router.get ('/editrecipe', viewController.edit_recipe_view);
router.get ('/viewrecipe', viewController.view_recipe_view);
router.get ('/uploadrecipe', viewController.upload_recipe_view)
router.get ('/shoppinglist', viewController.shopping_list_view);

module.exports = router;