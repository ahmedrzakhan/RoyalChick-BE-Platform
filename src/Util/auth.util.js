const jwt = require('jsonwebtoken');

// Generate an access token
const generateAccessToken = (value) => {
  return jwt.sign(value, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1800s',
  });
};
module.exports = { generateAccessToken };
