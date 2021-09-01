/* eslint-disable prefer-destructuring */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');
const io = require('../socket/socket');

// device Model
const deviceTemperatureSchema = require('../models/deviceTemperature');

// CREATE device
router.route('/add').post((req, res, next) => {
  deviceTemperatureSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    }

    // Trigger change notification to all clinets
    io.getIO().emit('addtempstats', { action: 'add', deviceStat: data });

    res.json(data);
  });
});

// READ devices
router.route('/list/:recCount').get((req, res, next) => {
  const recCount = (req.params.recCount !== '' || req.params.recCount !== undefined)
    ? (Number.parseFloat(req.params.recCount)) : 10;
  deviceTemperatureSchema.aggregate([
    {
      $sort: { _id: -1 },
    },
    {
      $limit: recCount,
    },
  ]).exec((error, data) => {
    if (error) {
      return next(error);
    }

    res.json(data);
  });
});

// READ Device with min and max transaction within Specific Date Range
router.route('/transactionlist/:fromDate/:toDate').get((req, res, next) => {
  deviceTemperatureSchema.aggregate([
    {
      $match: {
        created_at: { $gte: new Date(req.params.fromDate), $lte: new Date(req.params.toDate) },
      },
    },
    {
      $group: { _id: '$name', count: { $sum: 1 } },
    },
    {
      $sort: { count: -1 },
    },
  ])
    .exec((error, data) => {
      if (error) {
        return next(error);
      }

      const results = [];

      if (data.length > 0) {
        results[0] = data[0];
        results[1] = data[data.length - 1];
      }

      res.json(results);
    });
});

// Delete device stats
router.route('/del/:deviceId').delete((req, res, next) => {
  deviceTemperatureSchema.deleteMany(
    { deviceId: mongoose.Types.ObjectId(req.params.deviceId) },
    (error, data) => {
      if (error) {
        return next(error);
      }

      // Trigger change notification to all clinets
      io.getIO().emit('deletetempstats', { action: 'delete' });

      res.status(200).json({
        msg: data,
      });
    },
  );
});

module.exports = router;
