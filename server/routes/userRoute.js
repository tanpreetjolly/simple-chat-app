const express = require('express');
const registerController = require('../controllers/registerController');
const loginController = require('../controllers/loginController');
const verifyEmail = require('../controllers/emailVerifyController');
const router = express.Router();

router.post('/register',registerController);
router.post('/login', loginController);
router.get("/:id/verify/:token", verifyEmail);

module.exports = router;
