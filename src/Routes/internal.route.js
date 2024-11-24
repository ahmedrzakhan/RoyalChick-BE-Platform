const express = require('express');
const { UserController } = require('../Controllers/user.controller');
const staffRouter = require('./staff.route');
const kitenStaffRouter = require('./kitchenStaff.route');
const mangerRouter = require('./manager.route');
const executiveRouter = require('./executive.route');
const { Autheticator } = require('./../middleware/authenticate');

const router = express.Router();

// router.use('/staff', authenticateStaff, staffRouter);
router.use(
  '/kitchenStaff',
  Autheticator.authenticateKitchenStaff,
  kitenStaffRouter,
);
// router.use('/manager', authenticateManager, mangerRouter);
router.use('/executive', Autheticator.authenticateExecutive, executiveRouter);

module.exports = router;
