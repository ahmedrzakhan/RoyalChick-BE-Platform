const express = require('express');
const {
  CentralKitchenController,
} = require('../Controllers/centralKitchen.controller');
const validateRequest = require('../middleware/validateRequest');
const {
  CentralKitchenValidation,
} = require('../Validation/centralKitchen.validation');

const router = express.Router();

router.post(
  '/kitchen',
  validateRequest(CentralKitchenValidation.createCentralKitchenSchema),
  CentralKitchenController.createCentralKitchenSchema,
);

module.exports = router;
