const EsmWebpackPlugin = require('@purtuga/esm-webpack-plugin');

let config = require('./webpack.base.config.js');

const packageDist = 'es';
config = config({ packageDist });
config.output.libraryTarget = 'var';
config.plugins.push(new EsmWebpackPlugin());
module.exports = config;
