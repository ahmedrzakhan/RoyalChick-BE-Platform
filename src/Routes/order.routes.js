const express = require('express');
const {verifyToken} = require("../middleware/auth");
const {OrderController} = require("../Controllers/order.controller");
const router = express.Router();

router.post('/create',verifyToken,  OrderController.CreateOrder);
router.post('/create/item',verifyToken,  OrderController.createOrderItem);
router.get('/orders',verifyToken,  OrderController.getAllOrdersByCustomer);
router.get('/track/:order_id',  OrderController.trackOrder);
router.patch('/edit/:order_id',  OrderController.editOrder);
module.exports = router;