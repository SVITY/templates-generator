const webpack = require('webpack');
const path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  context: `${__dirname}/src`,
  entry: {
    index: './index.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    library: '[name]',
  },

  watch: NODE_ENV === 'development',

  watchOptions: {
    aggregateTimeout: 50,
  },

  devtool: NODE_ENV === 'development' ? 'cheap-inline-module-source-map' : null,

  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV),
    }),
  ],

  module: {
    loaders: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /(node_modules)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
      },
    ],
  },
};
