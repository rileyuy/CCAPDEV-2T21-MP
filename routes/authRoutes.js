const express = require ('express');
const authController = require ('../controllers/authController');

const router = express.Router();

router.post ('/register', authController.user_register);
router.post ('/login', authController.user_login);

module.exports = router;