const config = require('config-lite')(__dirname);
const mongoose = require('mongoose');
let count = 0;
function createMongooseConnection(cb) {
  // create the database connection
  mongoose.connect(config.mongodb.dbURI, config.mongodb.dbOptions);

  // when successfully connected
  mongoose.connection.on('connected', function () {
      console.info('Mongoose connected to ' + config.mongodb.dbURI);
  });

  // if the connection throws an error
  mongoose.connection.on('error', function (err) {
      console.error('Mongoose connection error: ' + err);
  });

  // when the connection is disconnected
  mongoose.connection.on('disconnected', function () {
      // console.info('Mongoose disconnected');
      if(count === 0){
          var msg = '【服务器数据库宕机】, 服务IP: ' + config.mongodb.dbHost;
          console.log(msg);
          //短信通知
          // Sender.sendSMS('13533795966', msg, function (err, httpResponse, body) {
          //     if (err) {
          //         console.error(err);
          //         console.info('Mongoose disconnected Send SMS error: '+ err);
          //     }
          //     var result = body.split(',');
          //     if (result[1] === '0') {
          //         console.info('Mongoose disconnected Send SMS success: '+result[1]);
          //     } else {
          //         console.info('Mongoose disconnected Send SMS fail: '+result[1]);
          //     }
          // });
      }else {
        console.info('Mongoose disconnected!');
      }
      count += 1;
  });

  // when the connection is open
  mongoose.connection.once('open', function () {
      if(cb && typeof(cb) === 'function') {cb();}
  });

  // if the Node process ends, close the Mongoose connection
  process.on('SIGINT', function() {
      mongoose.connection.close(function () {
          console.info('Mongoose disconnected through app termination');
          process.exit(0);
      });
  });
}
module.exports = createMongooseConnection;