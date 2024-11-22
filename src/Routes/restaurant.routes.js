const express = require('express');

const {
  RestaurantController,
} = require('../Controllers/restaurant.controller');
const router = express.Router();

router.post('/create', RestaurantController.createRestaurant);

module.exports = router;
