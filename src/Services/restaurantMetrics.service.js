const {
  RestaurantMetricsRepository,
} = require('../Repositories/restaurantMetrics.repository');

const logger = require('./../config/logger');

const getRestaurantMetrics = async (queryOptions) => {
  try {
    const result =
      await RestaurantMetricsRepository.getRestaurantMetrics(queryOptions);
    return result;
  } catch (error) {
    logger.error(
      'Failed to fetch restaurant metrics',
      'GET_RESTAURANT_METRICS',
      'GET_RESTAURANT_METRICS',
      error,
    );
    throw error;
  }
};

const getRestaurantMetricsByRestoId = async (restaurantId) => {
  try {
    const result =
      await RestaurantMetricsRepository.getRestaurantMetricsByRestoId(
        restaurantId,
      );
    return result;
  } catch (error) {
    logger.error(
      'Failed to fetch restaurant metric by resto id',
      'GET_RESTAURANT_METRICS',
      'GET_RESTAURANT_METRICS_BY_RESTO_ID',
      error,
    );
    throw error;
  }
};
const RestaurantMetricsService = {
  getRestaurantMetrics,
  getRestaurantMetricsByRestoId,
};

module.exports = { RestaurantMetricsService };
