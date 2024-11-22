const express = require('express');

const { ResturantController } = require('../Controllers/resturant.controller');
const router = express.Router();

router.post('/create', ResturantController.createResturant);

module.exports = router;
