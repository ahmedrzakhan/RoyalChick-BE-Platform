const UserRepository = require('../repositories/user.repository');

const getUserById = (userId) => {
  return UserRepository.findById(userId);
};
const getUserByEmail = (userId) => {
  return UserRepository.findByEmail(userId);
};

const saveUser = async (user) => {
  return UserRepository.saveUser(user);
};
const UserService = { getUserById, saveUser, getUserByEmail };

module.exports = { UserService };
