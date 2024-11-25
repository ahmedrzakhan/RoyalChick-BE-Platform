const {ShiftController} = require('../Repositories/shift.repositories')

const createNewShift = async (shift) => {
    return await ShiftController.createShift(shift);
}


//get shifts by restaurant_id
const getShiftsByRestaurantId = async (restaurant_id) => {
    return await ShiftController.getShiftsByRestaurantId(restaurant_id);
}

const ShiftService = {createNewShift, getShiftsByRestaurantId};
module.exports = {ShiftService};