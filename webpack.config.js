const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

function getAbPath(dir) {
  return path.resolve(__dirname, dir);
}

module.exports = {
  mode: 'development',
  entry: {
    main: getAbPath('./main.js'),
    index: getAbPath('./src/index/index.js'),
  },
  devServer: {
    port: 7777,
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    }, {
      test: /\.(png|jpge?|gif)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8192,
        },
      }],
    }, {
      test: /\.pug$/,
      use: ['pug-loader'],
    }],
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Miccai',
      filename: 'index.html',
      template: getAbPath('./src/pages/index.pug'),
      inject: 'index',
    }),
  ],
}
