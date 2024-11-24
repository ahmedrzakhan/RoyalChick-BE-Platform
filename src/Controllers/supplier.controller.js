const { SupplierService } = require('../Services/supplier.service');

const logger = require('./../config/logger');

const getSuppliers = async (req, res, next) => {
  try {
    const { page, limit, sort } = req.query;

    const result = await SupplierService.getSuppliers({
      page,
      limit,
      sort,
    });

    return res.status(200).json(result);
  } catch (error) {
    logger.error(
      'Failed to fetch supplier',
      'GET_SUPPLIERS',
      'GET_SUPPLIERS',
      error,
      { employeeId: req.employee?.id },
    );
    return next(error);
  }
};

const SupplierController = {
  getSuppliers,
};

module.exports = { SupplierController };
