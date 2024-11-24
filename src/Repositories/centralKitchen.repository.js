const { pool } = require('../config/database');
const logger = require('./../config/logger');

const getCentralKitchens = async (queryOptions) => {
  try {
    const { page, limit, sort } = queryOptions;

    const offset = (page - 1) * limit;

    const numericLimit = Number(limit);
    const numericOffset = Number(offset);

    const query = `
            SELECT
              ck.*,
              (SELECT COUNT(*) FROM central_kitchen) as total_count
            FROM central_kitchen ck
            ORDER BY ck.created_at ${sort === 'asc' ? 'ASC' : 'DESC'}
            LIMIT ${numericLimit} OFFSET ${numericOffset}
        `;

    const [results] = await pool.query(query);

    // If no results, return empty with count 0
    if (!results.length) {
      return {
        kitchens: [],
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
    const kitchens = results.map(({ total_count, ...kitchen }) => kitchen);
    const totalPages = Math.ceil(totalCount / limit);

    return {
      kitchens,
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
      'Failed to fetch central kitchens',
      'GET_CENTRAL_KITCHENS',
      'GET_CENTRAL_KITCHENS',
      error,
    );
    throw error;
  }
};

const getCentralKitchenById = async (kitchenId) => {
  try {
    const query = `
    SELECT
        ck.*
    FROM central_kitchen ck
    WHERE ck.kitchen_id = ${kitchenId}
`;

    const [results] = await pool.query(query);
    return results;
  } catch (error) {
    logger.error(
      'Failed to fetch central kitchen',
      'GET_CENTRAL_KITCHEN',
      'GET_CENTRAL_KITCHEN_BY_ID',
      error,
    );
    throw error;
  }
};

const createCentralKitchen = async (queryOptions) => {
  try {
    const { name, address, city, postcode, phone, manager_id, status } =
      queryOptions;
    const query = `INSERT INTO central_kitchen (
      name,
      address,
      city,
      postcode,
      phone,
      manager_id,
      status
  ) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const values = [name, address, city, postcode, phone, manager_id, status];
    const [result] = await pool.query(query, values);

    // Fetch the newly created kitchen
    const [createdKitchen] = await pool.query(
      'SELECT * FROM central_kitchen WHERE kitchen_id = ?',
      [result.insertId],
    );

    return createdKitchen[0];
  } catch (error) {
    logger.error(
      'Failed to create central kitchen',
      'CREATE_CENTRAL_KITCHEN',
      'CREATE_CENTRAL_KITCHEN',
      error,
    );
    throw error;
  }
};

const CentralKitchenRepository = {
  getCentralKitchens,
  getCentralKitchenById,
  createCentralKitchen,
};

module.exports = { CentralKitchenRepository };
