const { ResturantService } = require('../Services/resturant.service');

const createResturant = async (req, res) => {
  try {
    const resturant = await ResturantService.saveResturant(req.body);
    res.send(resturant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const ResturantController = { createResturant };
module.exports = { ResturantController };
