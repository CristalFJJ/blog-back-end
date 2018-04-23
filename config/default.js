const config = {
  port: 3000,
  session: {
    secret: 'Cristalblog',
    key: 'Cristalblog',
    maxAge: 2592000000
  },
  mongodb: {
    // 测试
    // dbHost: '120.78.178.50',
    // 本地 
    dbHost: "127.0.0.1",
    dbPort: 27017,
    dbName: "db",
    dbOptions: {auto_reconnect: true, poolSize: 10, useMongoClient: true, user: "cristal", pass: "123456"},
  },
}
config.mongodb.dbURI = `mongodb://${config.mongodb.dbHost}:${config.mongodb.dbPort}/${config.mongodb.dbName}`;
module.exports = config;