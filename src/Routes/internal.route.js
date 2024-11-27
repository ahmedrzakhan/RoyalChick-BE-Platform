const express = require('express');
const { UserController } = require('../Controllers/user.controller');
const staffRouter = require('./staff.route');
const kitenStaffRouter = require('./kitchenStaff.route');
const mangerRouter = require('./manager.route');
const executiveRouter = require('./executive.route');
const { Autheticator } = require('./../middleware/authenticate');
const {
  verifyUserTypeIsKitchenStaff,
  verifyUserTypeIsManager,
  verifyUserTypeIsExecutive,
} = require('../middleware/auth');
const router = express.Router();

// router.use('/staff', authenticateStaff, staffRouter);

router.use('/kitchenStaff', verifyUserTypeIsKitchenStaff, kitenStaffRouter);

router.use('/manager', verifyUserTypeIsManager, mangerRouter);

router.use('/executive', verifyUserTypeIsExecutive, executiveRouter);

module.exports = router;
