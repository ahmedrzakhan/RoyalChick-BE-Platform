const UserRepository = require("../repositories/user.repository");

const getUserById = (userId) => {
  return UserRepository.findById(userId);
};

const UserService = { getUserById };

module.exports = { UserService };
