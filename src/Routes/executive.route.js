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

router.post(
  '/kitchen',
  validateRequest(CentralKitchenValidation.createCentralKitchenSchema),
  CentralKitchenController.createCentralKitchen,
);

router.post(
  '/kitchen/:kitchenId',
  validateRequest(CentralKitchenValidation.updateCentralKitchenByIdSchema),
  CentralKitchenController.updateCentralKitchenById,
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

router.get(
  '/inventoryTransactions/:inventoryTransactionId',
  validateRequest(
    InventoryTransactionsValidation.getInventoryTransactionByIdSchema,
  ),
  InventoryTransactionsController.getInventoryTransactionById,
);

module.exports = router;
