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

const createCentralKitchen = async (queryOptions) => {
  try {
    const result =
      await CentralKitchenRepository.createCentralKitchen(queryOptions);
    return result;
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

const updateCentralKitchen = async (kitchenId, kitchenUpdates) => {
  try {
    const result = await CentralKitchenRepository.updateCentralKitchen(
      kitchenId,
      kitchenUpdates,
    );
    return result;
  } catch (error) {
    logger.error(
      'Failed to update central kitchen',
      'UPDATE_CENTRAL_KITCHEN',
      'UPDATE_CENTRAL_KITCHEN_BY_ID',
      error,
      { kitchenId },
    );
    throw error;
  }
};

const CentralKitchenService = {
  getCentralKitchens,
  getCentralKitchenById,
  createCentralKitchen,
  updateCentralKitchen,
};

module.exports = { CentralKitchenService };
