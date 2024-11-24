const express = require('express');
const {
  CentralKitchenController,
} = require('../Controllers/centralKitchen.controller');
const { SupplierController } = require('../Controllers/supplier.controller');
const {
  InventoryTransactionsController,
} = require('../Controllers/InventoryTransaction.controller');
const validateRequest = require('../middleware/validateRequest');
const {
  CentralKitchenValidation,
} = require('../Validation/centralKitchen.validation');
const { SupplierValidation } = require('../Validation/supplier.validation');
const {
  InventoryTransactionsValidation,
} = require('../Validation/inventoryTransaction.validation');

const router = express.Router();

router.get(
  '/kitchen',
  validateRequest(CentralKitchenValidation.getCentralKitchensSchema),
  CentralKitchenController.getCentralKitchens,
);

router.get(
  '/kitchen/:kitchenId',
  validateRequest(CentralKitchenValidation.getCentralKitchenByIdSchema),
  CentralKitchenController.getCentralKitchenById,
);

router.get(
  '/supplier',
  validateRequest(SupplierValidation.getSuppliersSchema),
  SupplierController.getSuppliers,
);

router.get(
  '/supplier/:supplierId',
  validateRequest(SupplierValidation.getSupplierByIdSchema),
  SupplierController.getSupplierById,
);

router.post(
  '/supplier',
  validateRequest(SupplierValidation.createSupplierSchema),
  SupplierController.createSupplier,
);

router.post(
  '/supplier/:supplierId',
  validateRequest(SupplierValidation.updateSupplierByIdSchema),
  SupplierController.updateSupplierById,
);

router.get(
  '/inventoryTransactions',
  validateRequest(
    InventoryTransactionsValidation.getInventoryTransactionsSchema,
  ),
  InventoryTransactionsController.getInventoryTransactions,
);

module.exports = router;
