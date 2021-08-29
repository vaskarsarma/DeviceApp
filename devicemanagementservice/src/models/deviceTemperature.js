const mongoose = require('mongoose');

const { Schema } = mongoose;

const deviceTemperatureSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  deviceId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Device',
  },
  temperature: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
}, {
  collection: 'deviceTemperatureStats',
});

module.exports = mongoose.model('DeviceTempStats', deviceTemperatureSchema);
