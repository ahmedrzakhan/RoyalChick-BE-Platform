const express = require('express');
const { AttendanceController } = require('../Controllers/attendance.controller');
const { verifyTokenForEmployee } = require('../middleware/auth');

const router = express.Router();

router.post('/clockin', verifyTokenForEmployee, AttendanceController.createattendanceRecord);

router.get('/get', verifyTokenForEmployee, AttendanceController.getAllAttendanceRecordsForEmployee);
router.patch('/clockout/:id', verifyTokenForEmployee, AttendanceController.updateAttendanceRecord);


module.exports = router;