let browserSync = require('browser-sync').create();
browserSync.init({
  port: 8089,
  // browser: ["google chrome canary"],
  server: {
    baseDir: './',
    directory: false,
  },
});
