const { UserService } = require('../Services/user.service');
const { generateAccessToken } = require('../Util/auth.util');
const getUser = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const user = await UserService.saveUser(req.body);
    res.send(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await UserService.getUserByEmail(req.body.email);
    if (!user) {
      return res.status(404).send('User not found');
    }
    if (user[0][0].password != req.body.password) {
      return res.status(401).send('Invalid credentials');
    }
    //generate token
    const token = generateAccessToken({ email: user[0][0].email });
    const response = { token: token };
    res.send(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const forgotPassword = async (req, res) => {};

const getOrdersByEmail = async (req, res) => {
  try {
    req.user.email;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const UserController = {
  getUser,
  registerUser,
  loginUser,
};

module.exports = { UserController };
