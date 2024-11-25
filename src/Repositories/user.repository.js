const { pool } = require('../config/database');
const userDataToRetrieved = ["id" , "username", "email", "status", "created_at"];
const saveUser = async (user) => {
  // Save user to database
  const query =
    'INSERT INTO users (username, email, password, status) VALUES (?, ?, ?, ?)';
  await pool.execute(query, [
    user.username,
    user.email,
    user.password,
    user.status,
  ]);
  return user;
};

const findByEmail = async (email) => {
  console.log(userDataToRetrieved.join(','));
  const query = `SELECT ${userDataToRetrieved.join(',')} users WHERE email = ?`;
  return await pool.execute(query, [email]);
};

const findById = async (id) => {
  console.log("Getting users by Id");
  console.log(userDataToRetrieved.join(','));
  const query = `SELECT ${userDataToRetrieved.join(',')} FROM users WHERE id = ?`;
  return await pool.execute(query, [id]);
}

const retriveFullUser = async(email)=>{
  const query = `SELECT * FROM users WHERE email = ?`;
  return await pool.execute(query, [email]);
}

const UserRepository = { saveUser, findByEmail , findById, retriveFullUser};

module.exports = UserRepository;
