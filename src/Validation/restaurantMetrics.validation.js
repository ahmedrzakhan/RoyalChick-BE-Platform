const Joi = require('joi');

const getRestaurantMetricsSchema = {
  query: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(50).default(20),
    sort: Joi.string().valid('asc', 'desc').default('desc'),
  }),
};

const RestaurantMetricsValidation = {
  getRestaurantMetricsSchema,
};

module.exports = {
  RestaurantMetricsValidation,
};
