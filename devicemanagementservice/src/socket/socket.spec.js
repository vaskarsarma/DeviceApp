const socket = require('./socket');

describe('socket', () => {
  beforeEach(() => {
    process.env.alloweddomain = 'http://localhost:4000';
  });

  it('Should return error if not inititalized', () => {
    expect(() => socket.getIO()).toThrow(new Error('socket.io is not initialized'));
  });
});
