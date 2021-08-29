const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('I am sample GET API');
});

router.get('/aboutus', (req, res) => {
  res.send('I am the ABOUT US page.');
});

module.exports = router;
