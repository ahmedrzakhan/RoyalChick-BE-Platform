const express = require('express');
const { verifyToken } = require('../middleware/auth');
const { UserController } = require('../controllers/user.controller');

const router = express.Router();

router.get('/get', verifyToken, UserController.getUser);
router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);

module.exports = router;
