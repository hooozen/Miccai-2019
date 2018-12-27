const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');


function srcPath(dir) {
  dir = dir || '';
  return path.resolve(__dirname, './src', dir);
}

module.exports = {
  mode: 'development',
  entry: {
    main: './main.js',
    index: srcPath('index/index.js'),
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
      use: [{
        loader: 'apply-loader',
        options: {
          obj: {
            navs: [
              { name: 'Home', href: "./" },
              { name: 'Data', href: './data.html' },
              { name: 'Submit', href: './submit.html' },
              { name: 'Evaluate', href: './evaluate.html' },
              { name: 'Result', href: './result.html' },
            ],
            title: 'xxxxxxxx',
          },
        },
      },{
        loader: 'pug-loader',
        options: {
          basedir: srcPath(),
        }
      }],
    }],
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Miccai',
      filename: 'index.html',
      template: srcPath('layout/index.pug'),
      inject: 'index',
    }),
  ],
}
