const express = require ('express');
const authController = require ('../controllers/authController');
const viewController = require ('../controllers/viewController');

const router = express.Router();

router.post ('/register', authController.user_register);
router.post ('/login', authController.user_login);
router.get ('/login/:type', viewController.login_view);

module.exports = router;