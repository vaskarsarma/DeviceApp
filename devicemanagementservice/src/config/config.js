const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  alloweddomain: process.env.ALLOWEDDOMAIN,
  port: process.env.PORT,
};
