const babelJest = require('babel-jest');

const config = {
  presets: ['react', 'stage-2', 'env'],
  retainLines: true,
  plugins: ['transform-decorators-legacy', 'transform-class-properties', 'add-module-exports', 'lodash'],
};

module.exports = babelJest.createTransformer(config);
