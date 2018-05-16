const path = require('path');
const colors  = require('colors');
const express = require('./config/express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const config = require('config-lite')(__dirname);
const routes = require('./routes');
const pkg = require('./package');
const mongodb = require('./config/mongo');
const os      = require('os');
const numCPUs = os.cpus().length;
// Initialize mongoose
mongodb(function startServer() {
  // Initialize express
  const app = express.init();

  // Start up the server on the port specified in the config after we connected to mongodb
  // 监听端口，启动程序
  const server = app.listen(config.port, function () {
		
    let iptable = {};
		let ifaces = os.networkInterfaces();
		for (let dev in ifaces) {
			ifaces[dev].forEach(function(details,alias){
				if (details.family=='IPv4') {
					iptable[dev+(alias?':'+alias:'')] = details.address;
				}
			});
		}

    const serverBanner = ['',
          '*************************************' + ' EXPRESS SERVER '.yellow + '********************************************',
          '*',
          '* @ip: '+ iptable['本地连接:1'],
          '* @cpus: '+ numCPUs,
          '* ' + pkg.description,
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

