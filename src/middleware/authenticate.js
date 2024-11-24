const authenticateUser = (req, res, next) => {
  console.log('auth user');
  next();
};

const authenticateInternal = (req, res, next) => {
  console.log('auth Internal');
  next();
};

const authenticateKitchenStaff = (req, res, next) => {
  console.log('auth kitchenStaff');
  next();
};

const authenticateExecutive = (req, res, next) => {
  console.log('auth Executive');
  next();
};

const authenticateManager = (req, res, next) => {
  console.log('auth Manager');
  next();
};

const authenticateStaff = (req, res, next) => {
  console.log('auth Staff');
  next();
};

const Autheticator = {
  authenticateUser,
  authenticateInternal,
  authenticateStaff,
  authenticateKitchenStaff,
  authenticateManager,
  authenticateExecutive,
};

module.exports = { Autheticator };
