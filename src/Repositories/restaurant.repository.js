const { pool } = require('../config/database');

const createRestorant = async (restaurant) => {
  try {
    const query = `INSERT INTO restaurants (name, address_line1, address_line2, city, post_code, phone, email , opening_hours, closing_hours, seating_capacity, status, manager_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);`;
    const result = await pool.execute(query, [
      restaurant.name,
      restaurant.address_line1,
      restaurant.address_line2,
      restaurant.city,
      restaurant.post_code,
      restaurant.phone,
      restaurant.email,
      restaurant.opening_hours,
      restaurant.closing_hours,
      restaurant.seating_capacity,
      restaurant.status,
      restaurant.manager_id,
    ]);
    return restaurant;
  } catch (error) {
    console.log(error);
  }
};

const ResturanRepository = { createRestorant };

module.exports = { ResturanRepository };
