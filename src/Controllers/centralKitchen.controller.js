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

const CentralKitchenController = {
  getCentralKitchens,
};

module.exports = { CentralKitchenController };
