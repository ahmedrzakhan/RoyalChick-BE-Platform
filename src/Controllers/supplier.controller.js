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

const getSupplierById = async (req, res, next) => {
  try {
    const { supplierId } = req.params;

    const result = await SupplierService.getSupplierById(supplierId);
    return res.status(200).json(result);
  } catch (error) {
    logger.error(
      'Failed to fetch supplier',
      'GET_SUPPLIER',
      'GET_SUPPLIER_BY_ID',
      error,
      { supplierId: req.params.supplierId },
    );
    return next(error);
  }
};

const createSupplier = async (req, res, next) => {
  try {
    const {
      name,
      contact_person,
      email,
      phone,
      address,
      payment_terms,
      status,
    } = req.body;

    const queryOptions = {
      name,
      contact_person,
      email,
      phone,
      address,
      payment_terms,
      status,
    };
    const result = await SupplierService.createSupplier(queryOptions);
    return res.status(200).json(result);
  } catch (error) {
    logger.error(
      'Failed to create supplier',
      'CREATE_SUPPLIER',
      'CREATE_SUPPLIER',
      error,
      { supplierId: req.params.supplierId },
    );
    return next(error);
  }
};

const SupplierController = {
  getSuppliers,
  getSupplierById,
  createSupplier,
};

module.exports = { SupplierController };
