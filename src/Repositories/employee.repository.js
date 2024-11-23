const { pool } = require('../config/database');

const createEmployee = async (employee) => {
    console.log(employee);
  const query = `INSERT INTO employees (name, password, restaurant_id, position,hire_date, salary, status, email) VALUES (?,?,?,?,?,?,?,?);`;
  await pool.execute(query, [
    employee.name,
    employee.password,
    employee.restaurant_id,
    employee.position,
    employee.hire_date,
    employee.salary,
    employee.status,
    employee.email,
  ]);
  return employee;
};

const getEmployeeByEmail = async (email) => {
    const query = `SELECT * FROM employees WHERE email = ?;`;
    const result = await pool.execute(query, [email]);
    return result[0];
}

const EmployeeRepository = { createEmployee, getEmployeeByEmail };

module.exports = { EmployeeRepository, getEmployeeByEmail };
