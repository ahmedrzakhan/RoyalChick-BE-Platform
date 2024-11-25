const { EmployeeRepository } = require('../Repositories/employee.repository');

const createNewEmployee = async (employee) => {
  return await EmployeeRepository.createEmployee(employee);
};

const getEmployeeByEmail = async (email) => {
    return await EmployeeRepository.getEmployeeByEmail(email);
}
const getEmployeeById = async (id) => {
    return await EmployeeRepository.getEmployeeById(id);
}
const updateEmployee = async (email, employee) => {
    return await EmployeeRepository.updateEmployee(email, employee);
}

const getEmployeeInARestaurant = async (restaurant_id) => {
    return await EmployeeRepository.getEmployeeInaRestaurant(restaurant_id);
}
const EmployeeService = { createNewEmployee, getEmployeeByEmail, updateEmployee, getEmployeeById,getEmployeeInARestaurant };

module.exports = { EmployeeService };
