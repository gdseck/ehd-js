const baseConfig = require('./webpack.base.config')
const path = require('path')
const fs = require('fs')

const modulesDir = path.resolve(__dirname, '../src/modules')
const modules = fs.readdirSync(modulesDir)
const entries = modules.reduce((map, name) => {
  map[name] = `./src/modules/${name}`
  return map
}, {})

module.exports = {
  ...baseConfig,
  entry: entries,
  output: {
    path: path.resolve(process.cwd(), './lib/modules'),
    publicPath: '/',
    filename: (chunkData) => {
      const name = chunkData.chunk.name
      return `${name.substring(0, name.lastIndexOf('.'))}.js`
    },
    chunkFilename: '[id].js',
    libraryTarget: 'commonjs2'
  }
}
