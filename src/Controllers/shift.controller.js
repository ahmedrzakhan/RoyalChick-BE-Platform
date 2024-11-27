const {ShiftService} = require('../Services/shift.service')

const createShift=async (req,res,next)=>{
    try{
        const shift = req.body;
        shift.restaurant_id = req.user.restaurant_id;
         await ShiftService.createNewShift(shift);
        res.send({message:"Shift created successfully"});
    }catch(error){
        res.status(500).json({error:error.message});
    }
}

const getShiftByRestaurantId = async (req, res, next) => {
    try {
      const restaurant_id = req.user.restaurant_id;
      const shift = await ShiftService.getShiftsByRestaurantId(restaurant_id);
      res.send(shift)
    }
 catch (error) {
    res.status(500).json({ error: error.message });
}
}
const ShiftController = {
    createShift, getShiftByRestaurantId
}

module.exports = {ShiftController}