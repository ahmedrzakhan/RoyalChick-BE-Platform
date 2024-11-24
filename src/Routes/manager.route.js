const express = require('express');
const {
  CentralKitchenController,
} = require('../Controllers/centralKitchen.controller');
const validateRequest = require('../middleware/validateRequest');
const {
  CentralKitchenValidation,
} = require('../Validation/centralKitchen.validation');

const router = express.Router();

router.get(
  '/kitchen',
  validateRequest(CentralKitchenValidation.getCentralKitchensSchema),
  CentralKitchenController.getCentralKitchens,
);

router.get(
  '/kitchen/:kitchenId',
  validateRequest(CentralKitchenValidation.getCentralKitchenByIdSchema),
  CentralKitchenController.getCentralKitchenById,
);

module.exports = router;
