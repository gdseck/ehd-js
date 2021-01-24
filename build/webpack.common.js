const baseConfig = require('./webpack.base.config')
const path = require('path')

module.exports = {
  ...baseConfig,
  output: {
    path: path.resolve(process.cwd(), './lib'),
    publicPath: '/',
    filename: 'ehd-js.cjs.js',
    libraryTarget: 'commonjs2'
  }
}
