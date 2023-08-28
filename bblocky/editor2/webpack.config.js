const path = require('path');

module.exports = {
  cache: false,
  entry: {
    index: ['./out/index.js'],
    iframe: ['./out/iframe.js'],
    project: ['./out/project/halProject.js']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'web/js'),
  },
  optimization: {
    minimize: false
  }
};