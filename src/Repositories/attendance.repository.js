const { pool } = require('../config/database');

const createattendance = async (attendance) => {
    console.log(attendance);
    try {
        const query = `INSERT INTO attendance (employee_id, shift_id, clock_in, clock_out, hours_worked, status ) VALUES (?,?,?, ?, ?, ?);`;
        const result = await pool.execute(query, [
        attendance.employee_id,
        attendance.shift_id,
        attendance.clock_in,
        attendance.clock_out,
        attendance.hours_worked,
        attendance.status,
        ]);
        return {...attendance, id: result[0].insertId};
    } catch (error) {
        console.log(error);
    }
}
//
const getAttendanceByEmployeeId = async (employee_id) => {
    try {
        const query = `SELECT * FROM attendance WHERE employee_id = ?;`;
        const result = await pool.execute(query, [employee_id]);
        return result[0];
    } catch (error) {
        console.log(error);
    }
}

const getAttendanceRecord = async (attendance_id) => {
    try {
        const query = `SELECT * FROM attendance WHERE id = ?;`;
        const result = await pool.execute(query, [attendance_id]);
        return result[0];
    } catch (error) {
        console.log(error);
    }
}

const editAttendanceRecord = async (attendance, attendance_id) => {
    console.log(attendance);
    const query = `UPDATE attendance SET clock_out = ?, hours_worked = ?, status = ? WHERE id = ?;`;
    return await pool.execute(query, [attendance.clock_out, attendance.hours_worked, attendance.status,attendance_id]);
    
}

const attendanceRepository = { createattendance, getAttendanceByEmployeeId, getAttendanceRecord, editAttendanceRecord };  

module.exports = { attendanceRepository };