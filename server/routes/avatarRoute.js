const express = require('express');
const avatarController = require('../controllers/avatarController');
const router = express.Router();

router.post("/", avatarController.avatarController);
router.get("/all", avatarController.getAllAvatars);

module.exports = router;
