const { pool } = require('../config/database');

const getMenuItemById = async (id) => {
  const query = `SELECT * FROM menu_items WHERE id = ?;`;
  const result = await pool.execute(query, [id]);
  return result[0];
}

const saveMenu = async (menu) => {
  // Save user to database
  try {
    const query = `INSERT INTO menu_items (name, description, price, image, preparation_time, calories, allergens, status, is_featured) VALUES (?,?,?,?,?,?,?,?,?);`;
    await pool.execute(query, [
      menu.name,
      menu.description,
      menu.price,
      menu.image,
      menu.preparation_time,
      menu.calories,
      menu.allergens,
      menu.status,
      menu.is_featured,
    ]);
    return menu;
  } catch (error) {
    console.log(error);
  }
};

const getMenu = async () => {
  const query = 'SELECT * FROM menu_items';
  const menus = await pool.execute(query);
  return menus[0];
};

const MenuRepository = { saveMenu, getMenu ,getMenuItemById};

module.exports = { MenuRepository };
