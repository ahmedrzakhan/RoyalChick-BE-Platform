const { MenuService } = require('../Services/menu.service');

const createMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuService.saveMenu(req.body);
    res.send(menuItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllMenu = async (req, res) => {
  try {
    const menu = await MenuService.getAllMenu();
    res.send(menu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const MenuController = { createMenuItem, getAllMenu };

module.exports = { MenuController };
