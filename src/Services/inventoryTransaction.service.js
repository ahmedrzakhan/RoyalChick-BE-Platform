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

const getInventoryTransactionById = async (inventoryTransactionId) => {
  try {
    const result =
      await InventoryTransactionRepository.getInventoryTransactionById(
        inventoryTransactionId,
      );
    return result;
  } catch (error) {
    logger.error(
      'Failed to fetch inventory transcation by id',
      'GET_INVENTORY_TRANSACTIONS',
      'GET_INVENTORY_TRANSACTIONS_BY_ID',
      error,
    );
    throw error;
  }
};

const createTransaction = async (queryOptions) => {
  try {
    const result =
      await InventoryTransactionRepository.createTransaction(queryOptions);
    return result;
  } catch (error) {
    logger.error(
      'Failed to create inventory transaction',
      'CREATE_INVENTORY_TRANSACTION',
      'CREATE_INVENTORY_TRANSACTION',
      error,
    );
    throw error;
  }
};

const InventoryTransactionService = {
  getInventoryTransactions,
  getInventoryTransactionById,
  createTransaction,
};

module.exports = { InventoryTransactionService };
