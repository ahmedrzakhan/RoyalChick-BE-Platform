const {  attendanceRepository} = require('../Repositories/attendance.repository');   
const createattendance = async (attendance) => {
    return await attendanceRepository.createattendance(attendance);
}

const getAllAttendanceRecordsForEmployee = async (employee_id) => {
    return await attendanceRepository.getAttendanceByEmployeeId(employee_id);
}
const getAttendanceRecord = async (attendance_id) => {
    return await attendanceRepository.getAttendanceRecord(attendance_id);
}
const editAttendanceRecord = async (attendance, attendance_id) => {
    return await attendanceRepository.editAttendanceRecord(attendance, attendance_id);
}

const AttendanceService = { createattendance , getAllAttendanceRecordsForEmployee, editAttendanceRecord, getAttendanceRecord};
module.exports = { AttendanceService }; 