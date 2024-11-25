const express = require('express');
const {
  CentralKitchenController,
} = require('../Controllers/centralKitchen.controller');
const {
  RestaurantMetricsController,
} = require('../Controllers/restaurantMetrics.controller');

const validateRequest = require('../middleware/validateRequest');
const {
  CentralKitchenValidation,
} = require('../Validation/centralKitchen.validation');
const {
  RestaurantMetricsValidation,
} = require('../Validation/restaurantMetrics.validation');

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

router.get(
  '/restaurantMetrics/:restaurantId',
  validateRequest(
    RestaurantMetricsValidation.getRestaurantMetricsByRestoIdSchema,
  ),
  RestaurantMetricsController.getRestaurantMetricsByRestoId,
);

module.exports = router;
