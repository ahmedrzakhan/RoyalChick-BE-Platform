const {
  RestaurantMetricsService,
} = require('../Services/restaurantMetrics.service');

const logger = require('../config/logger');

const getRestaurantMetrics = async (req, res, next) => {
  try {
    const { page, limit, sort } = req.query;

    const result = await RestaurantMetricsService.getRestaurantMetrics({
      page,
      limit,
      sort,
    });

    return res.status(200).json(result);
  } catch (error) {
    logger.error(
      'Failed to fetch restaurant metrics',
      'GET_RESTAURANT_METRICS',
      'GET_RESTAURANT_METRICS',
      error,
      { employeeId: req.employee?.id },
    );
    return next(error);
  }
};

const getRestaurantMetricsByRestoId = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;
    const result =
      await RestaurantMetricsService.getRestaurantMetricsByRestoId(
        restaurantId,
      );
    return res.status(200).json(result);
  } catch (error) {
    logger.error(
      'Failed to fetch restaurant metric by resto id',
      'GET_RESTAURANT_METRICS',
      'GET_RESTAURANT_METRICS_BY_RESTO_ID',
      error,
      { employeeId: req.employee?.id, restaurantId: req.params.restaurantId },
    );
    return next(error);
  }
};

const RestaurantMetricsController = {
  getRestaurantMetrics,
  getRestaurantMetricsByRestoId,
};

module.exports = { RestaurantMetricsController };
