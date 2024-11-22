const { EmployeeService } = require('../Services/employee.service');

const createEmployee = async (req, res) => {
  try {
    const employee = await EmployeeService.createNewEmployee(req.body);
    res.send(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createStaffOrder = async (req, res) => {};

const staffOrderStatus = async (req, res) => {};

const staffAttendance = async (req, res) => {};

const staffTaks = async (req, res) => {};

const EmployeeController = { createEmployee };

module.exports = { EmployeeController };
