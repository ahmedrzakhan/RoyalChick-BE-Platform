const {
  InventoryTransactionService,
} = require('../Services/inventoryTransaction.service');

const logger = require('../config/logger');

const getInventoryTransactions = async (req, res, next) => {
  try {
    const { page, limit, sort } = req.query;

    const result = await InventoryTransactionService.getInventoryTransactions({
      page,
      limit,
      sort,
    });

    return res.status(200).json(result);
  } catch (error) {
    logger.error(
      'Failed to fetch inventory transcations',
      'GET_INVENTORY_TRANSACTIONS',
      'GET_INVENTORY_TRANSACTIONS',
      error,
      { employeeId: req.employee?.id },
    );
    return next(error);
  }
};

const getInventoryTransactionById = async (req, res, next) => {
  try {
    const { inventoryTransactionId } = req.params;

    const result =
      await InventoryTransactionService.getInventoryTransactionById(
        inventoryTransactionId,
      );
    return res.status(200).json(result);
  } catch (error) {
    logger.error(
      'Failed to fetch inventory transcation by id',
      'GET_INVENTORY_TRANSACTIONS',
      'GET_INVENTORY_TRANSACTIONS_BY_ID',
      error,
      { inventoryTransactionId: req.params.inventoryTransactionId },
    );
    return next(error);
  }
};

const InventoryTransactionsController = {
  getInventoryTransactions,
  getInventoryTransactionById,
};

module.exports = { InventoryTransactionsController };
