const express = require('express');
const { ShiftController } = require('../Controllers/shift.controller');
const { verifyTokenForEmployee, verifyUserTypeIsManager, verifyUserTypeIsStaff } = require('../middleware/auth');

const router = express.Router();

router.post('/create', verifyTokenForEmployee, verifyUserTypeIsManager, ShiftController.createShift);
//get shift by restaurant_id
router.get('/get',verifyTokenForEmployee,verifyUserTypeIsStaff,   ShiftController.getShiftByRestaurantId);
module.exports = router;