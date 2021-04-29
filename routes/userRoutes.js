const express = require('express');
const userController = require ('../controllers/userController');

const router = express.Router();

router.delete ('/deleteaccount', userController.user_delete);
router.put ('/editaccount/:id/update', userController.user_edit);

module.exports = router;