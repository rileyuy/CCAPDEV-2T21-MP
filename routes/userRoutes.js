const express = require('express');
const userController = require ('../controllers/userController');
const {body, validationResult} = require ('express-validator');

const router = express.Router();

router.get ('/deleteaccount/:id/delete', userController.delete_user);

router.put ('/editaccount/:id/update', [
    body ('email', 'Please enter a valid email address.').trim().isEmail(),
    body ('lastName', 'Please enter a new first name.').not().isEmpty(),
    body ('firstName', 'Please enter a new first name.').not().isEmpty()
],userController.edit_user);

router.post ('/addtoshoppinglist', userController.add_to_shopping_list)
router.post ('/deletefromshoppinglist/:id', userController.delete_from_shopping_list)

module.exports = router;