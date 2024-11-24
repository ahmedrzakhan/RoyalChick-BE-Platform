const Joi = require('joi');

const getCentralKitchensSchema = {
  query: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(50).default(20),
    sort: Joi.string().valid('asc', 'desc').default('desc'),
  }),
};

const getCentralKitchenByIdSchema = {
  params: Joi.object({
    kitchenId: Joi.number().integer().min(1),
  }),
};

const createCentralKitchenSchema = {
  body: Joi.object({
    name: Joi.string().max(100).required().trim(),
    address: Joi.string().max(255).required().trim(),
    city: Joi.string().max(100).required().trim(),
    postcode: Joi.string().max(20).required().trim(),
    phone: Joi.string().max(15).required(),
    manager_id: Joi.number().integer().min(1).optional(),
    status: Joi.string()
      .valid('ACTIVE', 'INACTIVE', 'RENOVATING')
      .default('ACTIVE'),
  }),
};

const CentralKitchenValidation = {
  getCentralKitchensSchema,
  getCentralKitchenByIdSchema,
  createCentralKitchenSchema,
};

module.exports = {
  CentralKitchenValidation,
};
