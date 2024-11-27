const { EmployeeService } = require('../Services/employee.service');
const { OrderService } = require('../Services/order.service');
const { generateAccessToken } = require('../Util/auth.util');
const createEmployee = async (req, res) => {
  req.body.restaurant_id = req.user.restaurant_id;
  try {
    const employee = await EmployeeService.createNewEmployee(req.body);
    //retrieve employee
    const newEmployee = await EmployeeService.getEmployeeByEmail(req.body.email);
    delete employee.password;
    res.send({...employee, position: employee.position,  token: generateAccessToken({ id: employee.id, position: employee.position })});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateEmployeeToken = async (req, res) => {
  try {
    const employee = await EmployeeService.getEmployeeByEmail(req.body.email);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    if (employee[0].password != req.body.password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    //generate token
    const token = generateAccessToken({
      id: employee[0].id,
      position: employee[0].position,
    });
    res.send({...employee[0], token: token});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const employee = await EmployeeService.getEmployeeByEmail(req.params.email);
    const modifiedEmployee = {
      restaurant_id: req.body.restaurant_id
        ? req.body.restaurant_id
        : employee[0].restaurant_id,
      position: req.body.position ? req.body.position : employee[0].position,
      salary: req.body.salary ? req.body.salary : employee[0].salary,
      status: req.body.status ? req.body.status : employee[0].status,
    };
    await EmployeeService.updateEmployee(req.params.email, modifiedEmployee);
    res.send({ message: 'Employee updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getSignedInEmployee = async (req, res) => {
  try {
    delete req.user.password;
    res.send(req.user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCompletedOrdersInEmployeeRestaurant = async (req, res) => {
  try {
    const restaurant_id = req.user.restaurant_id;
    const orders =
      await OrderService.getComletedOrdersInARestaurant(restaurant_id);
    res.send(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEmployeeInAManagerRestaurant = async (req, res) => {
  try {
    const restaurant_id = req.user.restaurant_id;
    const employees =
      await EmployeeService.getEmployeeInARestaurant(restaurant_id);
    res.send(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const createStaffOrder = async (req, res) => {};

const staffOrderStatus = async (req, res) => {};

const staffAttendance = async (req, res) => {};

const staffTaks = async (req, res) => {};

const EmployeeController = {
  createEmployee,
  generateEmployeeToken,
  updateEmployee,
  getSignedInEmployee,
  getCompletedOrdersInEmployeeRestaurant,
  getEmployeeInAManagerRestaurant,
};

module.exports = { EmployeeController };
