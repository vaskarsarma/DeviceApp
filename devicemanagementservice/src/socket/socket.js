/* eslint-disable global-require */
const { Server } = require('socket.io');
const { alloweddomain } = require('../config/config');

let io;

console.log('Socket IO >> ', alloweddomain);

module.exports = {
  init: (httpServer) => {
    io = new Server(httpServer, {
      cors: {
        origin: alloweddomain,
      },
    });
    return io;
  },

  getIO: () => {
    if (!io) {
      throw new Error('socket.io is not initialized');
    }
    return io;
  },
};
