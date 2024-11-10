const { UserService } = require("../services/user.service");

const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserService.getUserById(userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const UserController = {
  getUser,
};

module.exports = { UserController };
