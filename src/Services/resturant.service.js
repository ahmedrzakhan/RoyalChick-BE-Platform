const { ResturanRepository } = require('../Repositories/resturant.repository');

const saveResturant = async (resturant) => {
  return await ResturanRepository.createRestorant(resturant);
};
const ResturantService = { saveResturant };

module.exports = { ResturantService };
