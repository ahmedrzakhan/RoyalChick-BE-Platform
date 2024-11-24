const { pool } = require('../config/database');
const logger = require('./../config/logger');

const getSuppliers = async (queryOptions) => {
  try {
    const { page, limit, sort } = queryOptions;

    const offset = (page - 1) * limit;

    const numericLimit = Number(limit);
    const numericOffset = Number(offset);

    const query = `
              SELECT
                ck.*,
                (SELECT COUNT(*) FROM suppliers) as total_count
              FROM suppliers ck
              ORDER BY ck.created_at ${sort === 'asc' ? 'ASC' : 'DESC'}
              LIMIT ${numericLimit} OFFSET ${numericOffset}
          `;

    const [results] = await pool.query(query);

    // If no results, return empty with count 0
    if (!results.length) {
      return {
        suppliers: [],
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
    const suppliers = results.map(({ total_count, ...supplier }) => supplier);
    const totalPages = Math.ceil(totalCount / limit);

    return {
      suppliers,
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
      'Failed to fetch supplier',
      'GET_SUPPLIERS',
      'GET_SUPPLIERS',
      error,
    );
    throw error;
  }
};

const getSupplierById = async (supplierId) => {
  try {
    const query = `
    SELECT
        ck.*
    FROM suppliers ck
    WHERE ck.id = ${supplierId}
`;

    const [results] = await pool.query(query);
    return results;
  } catch (error) {
    logger.error(
      'Failed to fetch supplier',
      'GET_SUPPLIER',
      'GET_SUPPLIER_BY_ID',
      error,
    );
    throw error;
  }
};

const createSupplier = async (queryOptions) => {
  try {
    const {
      name,
      contact_person,
      email,
      phone,
      address,
      payment_terms,
      status,
    } = queryOptions;
    const query = `INSERT INTO suppliers (
      name,
      contact_person,
      email,
      phone,
      address,
      payment_terms,
      status
  ) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      name,
      contact_person,
      email,
      phone,
      address,
      payment_terms,
      status,
    ];
    const [result] = await pool.query(query, values);

    // Fetch the newly created kitchen
    const [createdSupplier] = await pool.query(
      'SELECT * FROM suppliers WHERE id = ?',
      [result.insertId],
    );

    return createdSupplier[0];
  } catch (error) {
    logger.error(
      'Failed to create supplier',
      'CREATE_SUPPLIER',
      'CREATE_SUPPLIER',
      error,
    );
    throw error;
  }
};

const SupplierRepository = {
  getSuppliers,
  getSupplierById,
  createSupplier,
};

module.exports = { SupplierRepository };
