const config = require('flarum-webpack-config')();

// Preserve other tracked artifacts; builds must not delete files in bulk.
config.output.clean = false;

module.exports = config;
