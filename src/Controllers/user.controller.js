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
    res.send({user: "User created successfully"});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const user = await UserService.getFullUser(req.body.email);
    if (!user[0][0]) {
      throw new Error('User not found');
    }
    if (user[0][0].password != req.body.password) {
      throw new Error('Invalid credentials');
    }
    //generate token
    const token = generateAccessToken({ id: user[0][0].id });
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
