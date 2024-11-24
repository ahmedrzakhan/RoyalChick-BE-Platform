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
  CentralKitchenController.createCentralKitchen,
);

router.post(
  '/kitchen/:kitchenId',
  validateRequest(CentralKitchenValidation.updateCentralKitchenByIdSchema),
  CentralKitchenController.updateCentralKitchenById,
);

module.exports = router;
