const {EmployeeRepository} = require("../Repositories/employee.repository");

const createNewEmployee = async (employee) => { 
    return await EmployeeRepository.createEmployee(employee);

}

const EmployeeService = {createNewEmployee}

module.exports = {EmployeeService}