module.exports = {
  setupFiles: [
    '<rootDir>/jest/enzyme.js',
    '<rootDir>/jest/setupTest.js',
    '<rootDir>/jest/babel.config.js',
    '<rootDir>/jest/component-prop-serializer.js',
  ],
  collectCoverageFrom: [
    'src/**/*.js',
    'src/App.js',
    '!<rootDir>/node_modules/',
    '!<rootDir>/src/index.js',
    '!<rootDir>/src/reportWebVitals.js',
  ],
};
