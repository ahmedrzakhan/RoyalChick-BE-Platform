const { pool } = require('../config/database');
const logger = require('./../config/logger');

const getRestaurantMetrics = async (queryOptions) => {
  try {
    const { page, limit, sort } = queryOptions;

    const offset = (page - 1) * limit;

    const numericLimit = Number(limit);
    const numericOffset = Number(offset);

    const query = `
                SELECT
                  rm.*,
                  (SELECT COUNT(*) FROM restaurant_metrics) as total_count
                FROM restaurant_metrics rm
                ORDER BY rm.created_at ${sort === 'asc' ? 'ASC' : 'DESC'}
                LIMIT ${numericLimit} OFFSET ${numericOffset}
            `;

    const [results] = await pool.query(query);

    // If no results, return empty with count 0
    if (!results.length) {
      return {
        restaurantMetrics: [],
        pagination: {
          currentPage: page,
          totalPages: 0,
          totalCount: 0,
          hasNextPage: false,
          hasPrevPage: page > 1,
          limit,
        },
      };
    }

    const totalCount = results[0].total_count;
    const restaurantMetrics = results.map(
      ({ total_count, ...restaurantMetric }) => restaurantMetric,
    );
    const totalPages = Math.ceil(totalCount / limit);

    return {
      restaurantMetrics,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
        limit,
      },
    };
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
    const query = `
    SELECT
        rm.*
    FROM restaurant_metrics rm
    WHERE rm.restaurant_id = ?
`;

    const [results] = await pool.query(query, [restaurantId]);
    return results;
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

const RestaurantMetricsRepository = {
  getRestaurantMetrics,
  getRestaurantMetricsByRestoId,
};

module.exports = { RestaurantMetricsRepository };
