const { SupplierRepository } = require('../Repositories/supplier.repository');

const logger = require('./../config/logger');

const getSuppliers = async (queryOptions) => {
  try {
    const result = await SupplierRepository.getSuppliers(queryOptions);
    return result;
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

const getSupplierById = async (supplierId) => {
  try {
    const result = await SupplierRepository.getSupplierById(supplierId);
    return result;
  } catch (error) {
    logger.error(
      'Failed to fetch supplier',
      'GET_SUPPLIER',
      'GET_SUPPLIER_BY_ID',
      error,
    );
    throw error;
  }
};

const SupplierService = {
  getSuppliers,
  getSupplierById,
};

module.exports = { SupplierService };
