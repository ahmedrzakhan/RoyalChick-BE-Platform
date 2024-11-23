const express = require('express');
const { EmployeeController } = require('../Controllers/employee.controller');
const { verifyTokenForEmployee, verifyUserTypeIsManager } = require('../middleware/auth');
const router = express.Router();

//create a new employee
router.post('/create', EmployeeController.createEmployee);
router.post('/login', EmployeeController.generateEmployeeToken);
router.get('/get',verifyTokenForEmployee , EmployeeController.getSignedInEmployee);
//modify employee details
router.patch('/update/:email', verifyTokenForEmployee, verifyUserTypeIsManager ,EmployeeController.updateEmployee);
module.exports = router;
