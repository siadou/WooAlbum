'use strict'

var fs = require('fs')  
var path = require('path')
var webpack = require('webpack')


module.exports = {
  entry: {
    WooAlbum: path.resolve(__dirname, 'src/WooAlbum.js'),
  },
  output: {
    path:'/dst/',
    filename: '[name].bundle.js',
    publicPath: './dst'
  },
  module: {
    loaders: [
      { 
        test: /\.js?$/, 
        exclude: /node_modules/, 
        loader: 'babel-loader',
        query: {
            presets: ['es2015'],
        }
      },
    ]
  },
  plugins: [
    //new webpack.DefinePlugin({
    //  'process.env' : {
    //    'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    //  }
    //}),
    //new webpack.optimize.CommonsChunkPlugin('common.js'),
    //new webpack.optimize.UglifyJsPlugin({
    //  sourceMap: false,
    //  compress: {
    //    warnings: false 
    //  }
    //})
  ]
}
