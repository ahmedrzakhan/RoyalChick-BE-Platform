const { RestaurantService } = require('../Services/restaurant.service');

const createRestaurant = async (req, res) => {
  try {
    const restaurant = await RestaurantService.saveRestaurant(req.body);
    res.send(restaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const RestaurantController = { createRestaurant };
module.exports = { RestaurantController };
