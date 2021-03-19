let config = require('./webpack.base.config.js');

const packageDist = 'lib';
let ret = config({ packageDist });
module.exports = ret;
