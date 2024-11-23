const express = require('express');
const {
  MenuController,
  getAllMenu,
} = require('../Controllers/menuItem.controller');
const { verifyTokenForEmployee, verifyUserTypeIsManager } = require('../middleware/auth');
const router = express.Router();

//create a new menu
//only an executive can create a menu
router.post('/create',verifyTokenForEmployee, verifyUserTypeIsManager,  MenuController.createMenuItem);

//Get all menu
router.get('/get', MenuController.getAllMenu);
module.exports = router;
