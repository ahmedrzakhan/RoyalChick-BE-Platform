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

const SupplierRepository = {
  getSuppliers,
};

module.exports = { SupplierRepository };
