const express = require('express');
const { UserController } = require('../controllers/user.controller');

const router = express.Router();

router.get('/:id', UserController.getUser);

module.exports = router;
