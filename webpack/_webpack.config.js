'use strict';

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const webpackConfig = require('./webpack.common');

const port = 3000;

webpackConfig.devtool = 'inline-source-map';

webpackConfig.plugins = webpackConfig.plugins.concat([new BundleAnalyzerPlugin()]);

module.exports = webpackConfig;
