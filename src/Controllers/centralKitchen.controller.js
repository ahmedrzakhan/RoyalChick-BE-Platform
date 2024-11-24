const { CentralKitchenService } = require('../Services/centralKitchen.service');

const logger = require('./../config/logger');

const getCentralKitchens = async (req, res, next) => {
  try {
    const { page, limit, sort } = req.query;

    const result = await CentralKitchenService.getCentralKitchens({
      page,
      limit,
      sort,
    });

    return res.status(200).json(result);
  } catch (error) {
    logger.error(
      'Failed to fetch central kitchens',
      'GET_CENTRAL_KITCHENS',
      'GET_CENTRAL_KITCHENS',
      error,
      { employeeId: req.employee?.id },
    );
    return next(error);
  }
};

const getCentralKitchenById = async (req, res, next) => {
  try {
    const { kitchenId } = req.params;

    const result = await CentralKitchenService.getCentralKitchenById(kitchenId);
    return res.status(200).json(result);
  } catch (error) {
    logger.error(
      'Failed to fetch central kitchen',
      'GET_CENTRAL_KITCHEN',
      'GET_CENTRAL_KITCHEN_BY_ID',
      error,
      { kitchenId },
    );
    return next(error);
  }
};

const createCentralKitchen = async (req, res, next) => {
  try {
    const { name, address, city, postcode, phone, manager_id, status } =
      req.body;
    const queryOptions = {
      name,
      address,
      city,
      postcode,
      phone,
      manager_id,
      status,
    };
    const result =
      await CentralKitchenService.createCentralKitchen(queryOptions);
    return res.status(200).json(result);
  } catch (error) {
    logger.error(
      'Failed to create central kitchen',
      'CREATE_CENTRAL_KITCHEN',
      'CREATE_CENTRAL_KITCHEN',
      error,
      { employeeId: req.employee?.id },
    );
    return next(error);
  }
};

const updateCentralKitchenById = async (req, res, next) => {
  try {
    const { kitchenId } = req.params;
    const kitchenData = req.body;
    const kitchenUpdates = {};
    for (const [key, value] of Object.entries(kitchenData)) {
      if (value !== undefined) {
        kitchenUpdates[key] = value;
      }
    }
    const result = await CentralKitchenService.updateCentralKitchen(
      kitchenId,
      kitchenUpdates,
    );
    return res.status(200).json(result);
  } catch (error) {
    logger.error(
      'Failed to update central kitchen',
      'UPDATE_CENTRAL_KITCHEN',
      'UPDATE_CENTRAL_KITCHEN_BY_ID',
      error,
      { kitchenId: req.params.kitchenId },
    );
    return next(error);
  }
};

const CentralKitchenController = {
  getCentralKitchens,
  getCentralKitchenById,
  createCentralKitchen,
  updateCentralKitchenById,
};

module.exports = { CentralKitchenController };
