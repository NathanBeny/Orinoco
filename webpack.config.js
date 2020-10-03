const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    polyfill: 'babel-polyfill',
    index: ['./js/index.js', './js/main.js'],
    products: ['./js/main.js', './js/products.js'],
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
};
