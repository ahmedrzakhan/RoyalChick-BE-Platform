const express = require('express');
const {verifyToken} = require("../middleware/auth");
const {OrderController} = require("../Controllers/order.controller");
const router = express.Router();

router.post('/create',verifyToken,  OrderController.CreateOrder);


module.exports = router;