const { pool } = require('../config/database');
const logger = require('./../config/logger');

const getCentralKitchens = async (queryOptions) => {
  try {
    const { page, limit, sort } = queryOptions;

    const offset = (page - 1) * limit;

    const numericLimit = Number(limit);
    const numericOffset = Number(offset);

    // Using direct values for LIMIT/OFFSET
    const query = `
            SELECT
              ck.*,
              (SELECT COUNT(*) FROM central_kitchen) as total_count
            FROM central_kitchen ck
            ORDER BY ck.created_at ${sort === 'asc' ? 'ASC' : 'DESC'}
            LIMIT ${numericLimit} OFFSET ${numericOffset}
        `;

    // Using query instead of execute since we're using direct values
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

const CentralKitchenRepository = {
  getCentralKitchens,
};

module.exports = { CentralKitchenRepository };
