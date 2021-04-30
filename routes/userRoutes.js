const express = require('express');
const userController = require ('../controllers/userController');

const router = express.Router();

router.get ('/deleteaccount/:id/delete', userController.user_delete);
router.put ('/editaccount/:id/update', userController.user_edit);

module.exports = router;