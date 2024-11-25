const Joi = require('joi');

const getRestaurantMetricsSchema = {
  query: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(50).default(20),
    sort: Joi.string().valid('asc', 'desc').default('desc'),
  }),
};

const getRestaurantMetricsByRestoIdSchema = {
  params: Joi.object({
    restaurantId: Joi.number().integer().min(1).required(),
  }),
};

const RestaurantMetricsValidation = {
  getRestaurantMetricsSchema,
  getRestaurantMetricsByRestoIdSchema,
};

module.exports = {
  RestaurantMetricsValidation,
};
