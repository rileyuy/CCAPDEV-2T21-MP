const express = require('express');
const userController = require ('../controllers/userController');

const router = express.Router();

router.delete ('/viewaccount', userController.user_delete);

module.exports = router;