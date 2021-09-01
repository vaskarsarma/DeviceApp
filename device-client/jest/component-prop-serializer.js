const { Component } = require('react');

// Fix snapshots break in case of component reference passed as a prop
module.exports = {
  test(val) {
    return val instanceof Component;
  },
  print() {
    return '[Component]';
  },
};
