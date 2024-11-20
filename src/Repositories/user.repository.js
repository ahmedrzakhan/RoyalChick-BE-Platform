const {pool} = require("../config/database");



const saveUser = async (user) => {
  // Save user to database
  const query = "INSERT INTO users (username, email, password, status) VALUES (?, ?, ?, ?)";
  await pool.execute(query, [user.username, user.email, user.password, user.status]);
  return user;
};

const findByEmail = async (email) => {
  console.log("Email value")
  const query = "SELECT * FROM users WHERE email = ?";
  return await pool.execute(query, [email]);
}

const UserRepository = {  saveUser, findByEmail };

module.exports = UserRepository;
