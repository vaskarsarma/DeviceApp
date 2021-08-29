/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
const express = require('express');

const router = express.Router();

const io = require('../socket/socket');

// device Model
const deviceSchema = require('../models/device');

// CREATE device
router.route('/add').post((req, res, next) => {
  deviceSchema.create(req.body, (error, data) => {
    console.log(JSON.stringify(req.body));
    if (error) {
      return next(error);
    }

    // Trigger change notification to all clinets
    io.getIO().emit('managedevice', { action: 'add' });

    res.json(data);
  });
});

// READ devices
router.route('/list').get((req, res, next) => {
  deviceSchema.find((error, data) => {
    if (error) {
      return next(error);
    }
    res.json(data);
  });
});

// Get Single device
router.route('/edit/:id').get((req, res, next) => {
  deviceSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    }
    res.json(data);
  });
});

// Update device
router.route('/update/:id').put((req, res, next) => {
  deviceSchema.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  }, { new: true }, (error, data) => {
    if (error) {
      console.log(error);
      return next(error);
    }
    // Trigger change notification to all clinets
    io.getIO().emit('managedevice', { action: 'update' });

    res.json(data);
    console.log('device updated successfully !');
  });
});

// Delete device
router.route('/del/:id').delete((req, res, next) => {
  deviceSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    }

    // Trigger change notification to all clinets
    io.getIO().emit('managedevice', { action: 'delete' });

    res.status(200).json({
      msg: data,
    });
  });
});

module.exports = router;
