const { EmployeeRepository } = require('../Repositories/employee.repository');

const createNewEmployee = async (employee) => {
  return await EmployeeRepository.createEmployee(employee);
};

const getEmployeeByEmail = async (email) => {
    return await EmployeeRepository.getEmployeeByEmail(email);
}
const EmployeeService = { createNewEmployee, getEmployeeByEmail };

module.exports = { EmployeeService };
