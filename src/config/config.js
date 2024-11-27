require('dotenv').config();
//
const NODE_ENV = process.env.NODE_ENV || 'STAGING';
const PORT = process.env.PORT || 9090;
const MONGODB_STRING = process.env.MONGODB_STRING;
const CONFIG = { MONGODB_STRING, NODE_ENV, PORT };

module.exports = { CONFIG };
