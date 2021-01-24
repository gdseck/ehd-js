module.exports = {
  presets: [['@babel/preset-env', { modules: false }], '@babel/preset-typescript'],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-transform-typescript',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-transform-regenerator'
  ]
}
