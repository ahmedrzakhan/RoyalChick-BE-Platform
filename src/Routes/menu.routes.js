const express = require('express');
const {MenuController, getAllMenu} = require("../Controllers/menuItem.controller");
const router = express.Router();

//create a new menu
router.post('/create', MenuController.createMenuItem);

//Get all menu
router.get('/get', MenuController.getAllMenu);
module.exports = router;