const {pool} = require("../config/database");

const createEmployee = async (employee) => {
    const query = `INSERT INTO employees (name, password, resturant_id, position,hire_date, salary, status, email) VALUES (?,?,?,?,?,?,?,?);`;
    await pool.execute(query, [employee.name, employee.password, employee.resturant_id, employee.position, employee.hire_date, employee.salary, employee.status, employee.email]);
    return employee;
    
}

const EmployeeRepository = {createEmployee};

module.exports = {EmployeeRepository};