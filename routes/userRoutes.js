const express = require('express');
const userController = require ('../controllers/userController');

const router = express.Router();

router.get ('/deleteaccount/:id/delete', userController.delete_user);
router.put ('/editaccount/:id/update', userController.edit_user);
router.post ('/addtoshoppinglist', userController.add_to_shopping_list)
router.get ('/deletefromshoppinglist/:id', userController.delete_from_shopping_list)

module.exports = router;