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

const createSupplierSchema = {
  body: Joi.object({
    name: Joi.string().min(2).max(100).required().trim(),
    contact_person: Joi.string().max(100).allow(null, '').trim(),
    email: Joi.string().email().max(100).required().trim(),
    phone: Joi.string()
      .pattern(/^[+]?[\d\s-]{8,15}$/)
      .required(),
    address: Joi.string().allow(null, '').trim(),
    payment_terms: Joi.string().max(100).allow(null, '').trim(),
    status: Joi.string().valid('ACTIVE', 'INACTIVE').default('ACTIVE'),
  }),
};

const updateSupplierByIdSchema = {
  params: Joi.object({
    supplierId: Joi.number().integer().min(1).required(),
  }),
  body: Joi.object({
    name: Joi.string().min(2).max(100).trim(),
    contact_person: Joi.string().max(100).allow(null, '').trim(),
    email: Joi.string().email().max(100).trim(),
    phone: Joi.string().pattern(/^[+]?[\d\s-]{8,15}$/),
    address: Joi.string().allow(null, '').trim(),
    payment_terms: Joi.string().max(100).allow(null, '').trim(),
    status: Joi.string().valid('ACTIVE', 'INACTIVE'),
  }),
};

const SupplierValidation = {
  getSuppliersSchema,
  getSupplierByIdSchema,
  createSupplierSchema,
  updateSupplierByIdSchema,
};

module.exports = {
  SupplierValidation,
};
