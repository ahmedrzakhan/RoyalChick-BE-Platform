const Joi = require('joi');

const getSuppliersSchema = {
  query: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(50).default(20),
    sort: Joi.string().valid('asc', 'desc').default('desc'),
  }),
};

const getSupplierByIdSchema = {
  params: Joi.object({
    supplierId: Joi.number().integer().min(1).required(),
  }),
};

const SupplierValidation = {
  getSuppliersSchema,
  getSupplierByIdSchema,
};

module.exports = {
  SupplierValidation,
};
