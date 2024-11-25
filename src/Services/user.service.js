const UserRepository = require('../Repositories/user.repository');

const getUserById = (userId) => {
  return UserRepository.findById(userId);
};

const getFullUser = (email) => {
  return UserRepository.retriveFullUser(email);
}
const getUserByEmail = (userId) => {
  return UserRepository.findByEmail(userId);
};

const saveUser = async (user) => {
  return UserRepository.saveUser(user);
};
const UserService = { getUserById, saveUser, getUserByEmail , getFullUser};

module.exports = { UserService };
