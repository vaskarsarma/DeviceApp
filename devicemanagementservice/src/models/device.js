/* eslint-disable consistent-return */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const deviceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
}, {
  collection: 'devices',
});

module.exports = mongoose.model('Device', deviceSchema);
