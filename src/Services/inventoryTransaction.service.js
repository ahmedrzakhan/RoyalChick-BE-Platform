const {
  InventoryTransactionRepository,
} = require('../Repositories/inventoryTransaction.repository');

const logger = require('../config/logger');

const getInventoryTransactions = async (queryOptions) => {
  try {
    const result =
      await InventoryTransactionRepository.getInventoryTransactions(
        queryOptions,
      );
    return result;
  } catch (error) {
    logger.error(
      'Failed to fetch inventory transcations',
      'GET_INVENTORY_TRANSACTIONS',
      'GET_INVENTORY_TRANSACTIONS',
      error,
    );
    throw error;
  }
};

const InventoryTransactionService = {
  getInventoryTransactions,
};

module.exports = { InventoryTransactionService };
