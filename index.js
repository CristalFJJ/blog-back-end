const path = require('path');
const colors  = require('colors');
const express = require('./config/express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const config = require('config-lite')(__dirname);
const routes = require('./routes');
const pkg = require('./package');
const mongodb = require('./config/mongo');
var os      = require('os');
var numCPUs = os.cpus().length;
// Initialize mongoose
mongodb(function startServer() {
  // Initialize express
  var app = express.init();

  // Start up the server on the port specified in the config after we connected to mongodb
  // 监听端口，启动程序
  var server = app.listen(config.port, function () {
      var serverBanner = ['',
          '*************************************' + ' EXPRESS SERVER '.yellow + '********************************************',
          '*',
          '* @cpus: '+numCPUs,
          '* ' + pkg.description ,
          '* @version ' + pkg.version,
          '* @author ' + pkg.author.name,
          '* @copyright ' + new Date().getFullYear() + ' ' + pkg.author.name,
          '* @license ' + pkg.license.type + ', ' + pkg.license.url,
          '*',
          '*' + ' App started on port: '.blue + config.port,
          '*',
          '*************************************************************************************************',
          ''].join('\n');
      console.info(serverBanner);
  });
  module.exports = app;
});

