const express = require ('express');
const authController = require ('../controllers/authController');
const viewController = require ('../controllers/viewController');
const { body, validationResult } = require('express-validator');

const router = express.Router();

router.post ('/register',  [body ('email', 'Please enter a valid email address.').trim().isEmail(),
                            body ('password', 'Please enter a password.').trim().not().isEmpty(),
                            body ('lastName', 'Please enter your last name.').not().isEmpty(),
                            body ('firstName', 'Please enter your first name.').not().isEmpty()], authController.user_register);

router.post ('/login', [body ('email', 'Please enter a valid email address.').trim().isEmail(),
                        body ('password', 'Please enter your password.').trim().not().isEmpty()], authController.user_login);
router.get ('/login/:type', viewController.login_view);
router.get ('/logout', authController.user_logout);

module.exports = router;