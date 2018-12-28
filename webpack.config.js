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
  output: {
    path: path.resolve(__dirname, './dist'),
  },
  devServer: {
    port: 7777,
  },
  module: {
    rules: [{
      test: /\.s?css$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
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
        loader: path.resolve('./src/loaders/pug-loader.js'),
        options: {
          basedir: srcPath('layout/'),
          data: {
            navs: [
              { name: 'Home', href: "./" },
              { name: 'Data', href: './data.html' },
              { name: 'Submit', href: './submit.html' },
              { name: 'Evaluate', href: './evaluate.html' },
              { name: 'Result', href: './result.html' },
            ],
            selectedId: 0,
            title: 'xxxxxxxx',
          },
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
    new HTMLWebpackPlugin({
      title: 'Miccai',
      filename: 'data.html',
      template: srcPath('layout/data.pug'),
      inject: 'index',
    }),

  ],
}
