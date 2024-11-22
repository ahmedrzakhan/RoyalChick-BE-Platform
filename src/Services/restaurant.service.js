const { ResturanRepository } = require('../Repositories/restaurant.repository');

const saveRestaurant = async (restaurant) => {
  return await ResturanRepository.createRestorant(restaurant);
};
const RestaurantService = { saveRestaurant };

module.exports = { RestaurantService };
