const config = {
  port: 3000,
  session: {
    secret: 'Cristalblog',
    key: 'Cristalblog',
    maxAge: 2592000000
  },
  mongodb: {
    // 本地 
    dbHost: "127.0.0.1",
    dbPort: 27017,
    dbName: "blog",
    dbOptions: {auto_reconnect: true, poolSize: 10},
  },
  token:{
    secret: process.env.TOKEN_SECRET || 'cristalSecret',
    expiration: process.env.TOKEN_EXPIRATION || 60*60*24 //24 hours
  },
}
config.mongodb.dbURI = `mongodb://${config.mongodb.dbHost}:${config.mongodb.dbPort}/${config.mongodb.dbName}`;
module.exports = config;