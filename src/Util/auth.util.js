const jwt = require('jsonwebtoken');

// Generate an access token
const generateAccessToken = (value) => {
  return jwt.sign(value, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '3600s',
  });
};
module.exports = { generateAccessToken };
