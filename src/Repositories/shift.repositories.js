const { pool } = require('../config/database');

const createShift = async (shift) => {
    try {
        const query = `INSERT INTO shifts (restaurant_id, shift_start, shift_end, shift_date) VALUES (?,?,?,?);`;
        await pool.execute(query, [
            shift.restaurant_id,
            shift.shift_start,
            shift.shift_end,
            shift.shift_date
        ]);
        return shift;
    } catch (error) {
        console.log(error)
    }

}

const getShiftsByRestaurantId = async (restaurant_id) => {
    console.log("Getting shifts by restaurant id");
    console.log(restaurant_id);
    try {
        const query = `SELECT * FROM shifts where restaurant_id=?;`;
        const result = await pool.execute(query, [restaurant_id]);
        console.log(result);
        return result[0];
    } catch (error) {
        console.log(error);
    }
}
const ShiftController = { createShift, getShiftsByRestaurantId };
module.exports = { ShiftController };