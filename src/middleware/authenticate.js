const authenticateUser = (req, res, next) => {
  console.log("auth user");
  next();
};

const authenticateInternal = (req, res, next) => {
  console.log("auth Internal");
  next();
};

const Autheticator = {
  authenticateUser,
  authenticateInternal,
};

module.exports = { Autheticator };
