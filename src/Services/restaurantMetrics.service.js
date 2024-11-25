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

const RestaurantMetricsService = {
  getRestaurantMetrics,
};

module.exports = { RestaurantMetricsService };
