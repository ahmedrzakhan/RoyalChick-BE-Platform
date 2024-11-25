const express = require('express');
const { EmployeeController } = require('../Controllers/employee.controller');
const { verifyTokenForEmployee, verifyUserTypeIsManager } = require('../middleware/auth');
const router = express.Router();

//create a new employee
router.post('/create',verifyTokenForEmployee, verifyUserTypeIsManager, EmployeeController.createEmployee);
router.post('/login', EmployeeController.generateEmployeeToken);
router.get('/get',verifyTokenForEmployee , EmployeeController.getSignedInEmployee);
router.get('/get/orders',verifyTokenForEmployee , EmployeeController.getCompletedOrdersInEmployeeRestaurant);
//get all employees in a manager's restaurant
router.get('/get/employees',verifyTokenForEmployee, verifyUserTypeIsManager, EmployeeController.getEmployeeInAManagerRestaurant);
//modify employee details
router.patch('/update/:id', verifyTokenForEmployee, verifyUserTypeIsManager ,EmployeeController.updateEmployee);
module.exports = router;
