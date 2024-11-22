const { pool } = require('../config/database');

const createRestorant = async (resturant) => {
  try {
    const query = `INSERT INTO resturants (name, address_line1, address_line2, city, post_code, phone, email , opening_hours, closing_hours, seating_capacity, status, manager_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);`;
    const result = await pool.execute(query, [
      resturant.name,
      resturant.address_line1,
      resturant.address_line2,
      resturant.city,
      resturant.post_code,
      resturant.phone,
      resturant.email,
      resturant.opening_hours,
      resturant.closing_hours,
      resturant.seating_capacity,
      resturant.status,
      resturant.manager_id,
    ]);
    return resturant;
  } catch (error) {
    console.log(error);
  }
};

const ResturanRepository = { createRestorant };

module.exports = { ResturanRepository };
