const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');

router.post('/register', auth.registerController);
router.post('/login', auth.loginController);

module.exports = router;
