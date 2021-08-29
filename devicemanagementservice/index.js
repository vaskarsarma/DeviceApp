/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable global-require */
const express = require('express');
const http = require('http');
const createError = require('http-errors');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const dbConfig = require('./src/database/db');
const deviceRoutes = require('./src/routes/device-route');
const deviceTempRoutes = require('./src/routes/device-temp-route');

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));
app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use('/devices', deviceRoutes);
app.use('/devices/stats', deviceTempRoutes);

// Set http server
const server = http.createServer(app);

// Connecting mongoDB Database
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
  useNewUrlParser: true,
}).then(() => {
  console.log('Database sucessfully connected!');
},
(error) => {
  console.log(`Could not connect to database : ${error}`);
});

// Initialize Socket Connection
const io = require('./src/socket/socket').init(server);

io.on('connection', (socket) => {
  console.log('Client connected');
});

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`Started server with port ${port}`);
});

// 404 Error
app.use((req, res, next) => {
  next(createError(404));
});

// 500 Error
app.use((err, req, res, next) => {
  console.error(err.message);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

module.exports = app;
