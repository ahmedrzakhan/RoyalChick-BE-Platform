const { MenuRepository } = require('../Repositories/menu.repository');

const saveMenu = async (menu) => {
  return await MenuRepository.saveMenu(menu);
};

const getAllMenu = async () => {
  return await MenuRepository.getMenu();
};

const getMenuById = async (id) => {
  return await MenuRepository.getMenuItemById(id);
}
const MenuService = { saveMenu, getAllMenu, getAllMenu };

module.exports = { MenuService };
