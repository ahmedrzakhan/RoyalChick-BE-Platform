const {AttendanceService} = require('../Services/attendance.service');
const createattendanceRecord = async (req, res) => { 
    try {
        req.body.employee_id = req.user.id;
        req.body.clock_in = new Date().toLocaleTimeString([], { timeStyle: "short" })
        req.body.clock_out=null

        const record= await AttendanceService.createattendance(req.body);
        res.send(record);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

 }

 const getAllAttendanceRecordsForEmployee = async (req, res) => {
    try {
        const records = await AttendanceService.getAllAttendanceRecordsForEmployee(req.user.id);
        res.send(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
 }
    const updateAttendanceRecord = async (req, res) => {
        //get the record
        const rec = await AttendanceService.getAttendanceRecord(req.params.id);
        const record = rec[0];
        if (!record) {
            throw new Error({ error: 'Record not found' });
        }
        const updatedRecord = {
            clock_out: req.body.clock_out? req.body.clock_out : record.clock_out,
            hours_worked: req.body.hours_worked? req.body.hours_worked : record.hours_worked,
            status: req.body.status? req.body.status : record.status,    
        }
        try {
            const record = await AttendanceService.editAttendanceRecord(updatedRecord,req.params.id);
            res.send({message:"Record updated successfully"});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
 
 const AttendanceController = { createattendanceRecord, getAllAttendanceRecordsForEmployee, updateAttendanceRecord };
    module.exports = { AttendanceController };