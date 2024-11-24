const { pool } = require('../config/database');
const logger = require('../config/logger');

const getInventoryTransactions = async (queryOptions) => {
  try {
    const { page, limit, sort } = queryOptions;

    const offset = (page - 1) * limit;

    const numericLimit = Number(limit);
    const numericOffset = Number(offset);

    const query = `
                  SELECT
                    it.*,
                    (SELECT COUNT(*) FROM inventory_transactions) as total_count
                  FROM inventory_transactions it
                  ORDER BY it.created_at ${sort === 'asc' ? 'ASC' : 'DESC'}
                  LIMIT ${numericLimit} OFFSET ${numericOffset}
              `;

    const [results] = await pool.query(query);

    // If no results, return empty with count 0
    if (!results.length) {
      return {
        inventoryTransactions: [],
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
    const inventoryTransactions = results.map(
      ({ total_count, ...inventoryTransaction }) => inventoryTransaction,
    );
    const totalPages = Math.ceil(totalCount / limit);

    return {
      inventoryTransactions,
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
    const query = `
    SELECT
        it.*
    FROM inventory_transactions it
    WHERE it.transaction_id = ${inventoryTransactionId}
`;

    const [results] = await pool.query(query);
    return results;
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
    const { inventory_id, kitchen_id, type, quantity, recorded_by, notes } =
      queryOptions;
    const query = `INSERT INTO inventory_transactions (
      inventory_id,
      kitchen_id,
      type,
      quantity,
      recorded_by,
      notes
  ) VALUES (?, ?, ?, ?, ?, ?)`;

    const values = [
      inventory_id,
      kitchen_id,
      type,
      quantity,
      recorded_by,
      notes,
    ];
    const [result] = await pool.query(query, values);

    // Fetch the newly created kitchen
    const [createdTrnx] = await pool.query(
      'SELECT * FROM inventory_transactions WHERE transaction_id = ?',
      [result.insertId],
    );

    return createdTrnx[0];
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

const InventoryTransactionRepository = {
  getInventoryTransactions,
  getInventoryTransactionById,
  createTransaction,
};

module.exports = { InventoryTransactionRepository };
