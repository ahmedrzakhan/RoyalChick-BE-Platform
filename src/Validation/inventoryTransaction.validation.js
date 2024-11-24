const Joi = require('joi');

const getInventoryTransactionsSchema = {
  query: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(50).default(20),
    sort: Joi.string().valid('asc', 'desc').default('desc'),
  }),
};

const getInventoryTransactionByIdSchema = {
  params: Joi.object({
    inventoryTransactionId: Joi.number().integer().min(1).required(),
  }),
};

const createInventoryTransactionSchema = {
  body: Joi.object({
    inventory_id: Joi.number().integer().positive().required(),
    kitchen_id: Joi.number().integer().positive().required(),
    type: Joi.string()
      .valid('RESTOCK', 'USAGE', 'WASTE', 'TRANSFER')
      .required(),
    quantity: Joi.number().precision(2).positive().required(),
    recorded_by: Joi.number().integer().positive().required(),
    notes: Joi.string().max(1000).allow('', null),
  }),
};

const updateInventoryTransactionByIdSchema = {
  params: Joi.object({
    inventoryTransactionId: Joi.number().integer().min(1).required(),
  }),
  body: Joi.object({
    inventory_id: Joi.number().integer().positive(),
    kitchen_id: Joi.number().integer().positive(),
    type: Joi.string().valid('RESTOCK', 'USAGE', 'WASTE', 'TRANSFER'),
    quantity: Joi.number().precision(2).positive(),
    recorded_by: Joi.number().integer().positive(),
    notes: Joi.string().max(1000).allow('', null),
  }).min(1),
};

const InventoryTransactionsValidation = {
  getInventoryTransactionsSchema,
  getInventoryTransactionByIdSchema,
  createInventoryTransactionSchema,
  updateInventoryTransactionByIdSchema,
};

module.exports = {
  InventoryTransactionsValidation,
};
