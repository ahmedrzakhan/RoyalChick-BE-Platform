const express = require('express');
const { EmployeeController } = require('../Controllers/employee.controller');
const { verifyTokenForEmployee, verifyUserTypeIsExecutive } = require('../middleware/auth');
const {
  RestaurantController,
} = require('../Controllers/restaurant.controller');
const router = express.Router();

router.post('/create', verifyTokenForEmployee, verifyUserTypeIsExecutive, RestaurantController.createRestaurant);

module.exports = router;
