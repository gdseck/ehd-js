const path = require('path')
const nodeExternals = require('webpack-node-externals')

const config = {
  mode: 'production',
  entry: path.resolve(__dirname, '../src/index.ts'),
  optimization: {
    minimize: false
  },
  devtool: 'inline-source-map',
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, '../src')
    },
    modules: ['node_modules']
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: [/node_modules/, path.resolve(__dirname, '../example')],
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.js$/,
        include: process.cwd(),
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}

module.exports = config
