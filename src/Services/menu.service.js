const {MenuRepository} = require("../Repositories/menu.repository")

const saveMenu = async (menu) => {
   return await MenuRepository.saveMenu(menu);
}


const getAllMenu = async () => {
  return await MenuRepository.getMenu();
}
const MenuService = {saveMenu, getAllMenu}

module.exports= {MenuService}