const express = require ('express');
const authController = require ('../controllers/authController');
const viewController = require ('../controllers/viewController');
const { check, validationResult } = require('express-validator');

const router = express.Router();

router.post ('/register',   [check ('email', 'Please enter a valid email address.').isEmail(),
                            check ('password', 'Please enter a password.').not().isEmpty(),
                            check ('lastName', 'Please enter your last name.').not().isEmpty(),
                            check ('firstName', 'Please enter your first name.').not().isEmpty()], authController.user_register);
router.post ('/login', authController.user_login);
router.get ('/login/:type', viewController.login_view);
router.get ('/logout', authController.user_logout);

module.exports = router;