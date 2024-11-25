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
        if (!employee[0]) return res.status(404).send('Employee not found');
        req.user = employee[0];
        next();
    } catch (error) {
        next(error);
    }
}
//In addition, manager and exexcutive can perform staff actions
const verifyUserTypeIsStaff = async (req, res, next) => {
  try {
    if (req.user.position !== 'STAFF' && req.user.position!=='MANAGER' && req.user.position!='EXECUTIVE') return res.status(403).send('Forbidden');
    next();
  } catch (error) {
    next(error);
  }
}

const verifyUserTypeIsManager = async (req, res, next) => {
    try {
        if (req.user.position !== 'MANAGER'&&req.user.position!=='EXECUTIVE') return res.status(403).send('Forbidden');
        next();
    } catch (error) {
        next(error);
    }
    }

const verifyUserTypeIsExecutive = async (req, res, next) => {
    try {
        if (req.user.position !== 'EXECUTIVE') return res.status(403).send('Forbidden');
        next();
    } catch (error) {
        next(error);
    }
}
module.exports = { verifyToken, verifyUserTypeIsStaff, verifyUserTypeIsManager, verifyUserTypeIsExecutive, verifyTokenForEmployee };
