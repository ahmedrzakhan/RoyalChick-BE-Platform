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
