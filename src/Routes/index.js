const express = require('express');
const router = express.Router();
const userRoutes = require('./user.route');
const internalRoutes = require('./internal.route');
const { Autheticator } = require('../middleware/authenticate');

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Mount routes with their respective middleware
router.use('/users', Autheticator.authenticateUser, userRoutes);

router.use('/internal', Autheticator.authenticateInternal, internalRoutes);

const routerV1 = router;

module.exports = { routerV1 };
