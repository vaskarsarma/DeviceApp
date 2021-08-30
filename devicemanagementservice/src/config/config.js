const dotenv = require('dotenv');

dotenv.config();

const domainList = (process.env.ALLOWEDDOMAIN).split(',');
const alloweddomain = [];

if (domainList.length > 1) {
  domainList.forEach((i) => {
    alloweddomain.push(i);
  });
}

module.exports = {
  alloweddomain: (alloweddomain.length > 1) ? alloweddomain : process.env.ALLOWEDDOMAIN,
  port: process.env.PORT,
  myname: process.env.MYNAME,
};
