const {
  CentralKitchenRepository,
} = require('../Repositories/centralKitchen.repository');

const logger = require('./../config/logger');

const getCentralKitchens = async (queryOptions) => {
  try {
    const result =
      await CentralKitchenRepository.getCentralKitchens(queryOptions);
    return result;
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

const CentralKitchenService = {
  getCentralKitchens,
};

module.exports = { CentralKitchenService };
