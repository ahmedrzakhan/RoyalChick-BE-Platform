const express = require('express');
const { EmployeeController } = require('../Controllers/employee.controller');
const router = express.Router();

//create a new employee
router.post('/create', EmployeeController.createEmployee);
router.post('/login', EmployeeController.generateEmployeeToken);
module.exports = router;
