const jwt = require('jsonwebtoken');
const { UserService } = require('../Services/user.service');
const { EmployeeService } = require('../Services/employee.service');
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split('Bearer ')[1];
    if (token == null) return res.status(401);
    //verify token
    const id = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    //verify from db
    const user = await UserService.getUserById(id.id);
    if (!user[0]) return res.status(404).send('User not found');
    req.user = user[0][0];
    next();
  } catch (error) {
    next(error);
  }
};

const verifyTokenForEmployee = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split('Bearer ')[1];
    if (token == null) return res.status(401);
    //verify token
    const id = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    //verify from db
    const employee = await EmployeeService.getEmployeeById(id.id);
    if (!employee[0]) {
      throw new Error('Employee not found');
    }
    req.user = employee[0];
    next();
  } catch (error) {
    next(error);
  }
};
//In addition, manager and exexcutive can perform staff actions
const verifyUserTypeIsStaff = async (req, res, next) => {
  try {
    if (
      req.user.position !== 'STAFF' &&
      req.user.position !== 'MANAGER' &&
      req.user.position != 'EXECUTIVE'
    )
      if (req.user.position !== 'EXECUTIVE') {
        throw new Error('Forbidden');
      }
    next();
  } catch (error) {
    next(error);
  }
};

const verifyUserTypeIsManager = async (req, res, next) => {
  try {
    if (req.user.position !== 'MANAGER' && req.user.position !== 'EXECUTIVE')
      if (req.user.position !== 'EXECUTIVE') {
        throw new Error('Forbidden');
      }
    next();
  } catch (error) {
    next(error);
  }
};

const verifyUserTypeIsKitchenStaff = async (req, res, next) => {
  try {
    if (req.user.position !== 'KITCHEN_STAFF') {
      throw new Error('Forbidden');
    }

    next();
  } catch (error) {
    next(error);
  }
};

const verifyUserTypeIsExecutive = async (req, res, next) => {
  try {
    if (req.user.position !== 'EXECUTIVE') {
      throw new Error('Forbidden');
    }

    next();
  } catch (error) {
    next(error);
  }
};
module.exports = {
  verifyToken,
  verifyUserTypeIsKitchenStaff,
  verifyUserTypeIsStaff,
  verifyUserTypeIsManager,
  verifyUserTypeIsExecutive,
  verifyTokenForEmployee,
};
