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

const getCentralKitchenById = async (kitchenId) => {
  try {
    const result =
      await CentralKitchenRepository.getCentralKitchenById(kitchenId);
    return result;
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

const CentralKitchenService = {
  getCentralKitchens,
  getCentralKitchenById,
};

module.exports = { CentralKitchenService };
