const path = require('path')

module.exports = {
  mode: 'production',
  entry: {
    polyfill: 'babel-polyfill',
    index: ['./index.js', './controllers/main.js'],
    products: ['./controllers/main.js', './vue/products.js'],
    panier: ['./controllers/main.js', './vue/panier.js'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
}
