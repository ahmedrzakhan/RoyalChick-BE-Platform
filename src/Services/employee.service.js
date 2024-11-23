const { EmployeeRepository } = require('../Repositories/employee.repository');

const createNewEmployee = async (employee) => {
  return await EmployeeRepository.createEmployee(employee);
};

const getEmployeeByEmail = async (email) => {
    return await EmployeeRepository.getEmployeeByEmail(email);
}

const updateEmployee = async (email, employee) => {
    return await EmployeeRepository.updateEmployee(email, employee);
}
const EmployeeService = { createNewEmployee, getEmployeeByEmail, updateEmployee };

module.exports = { EmployeeService };
