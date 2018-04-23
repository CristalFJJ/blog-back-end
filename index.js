const path = require('path');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const config = require('config-lite')(__dirname);
const routes = require('./routes');
const pkg = require('./package');
// const mongodb = require('./config/mongo');
const app = express();

// mongodb()
// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')))

// session 中间件
app.use(session({
  name: config.session.key, // 设置 cookie 中保存 session id 的字段名称
  secret: config.session.secret, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  resave: true, // 强制更新 session
  saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
  cookie: {
    maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
  },
  // store: new MongoStore({// 将 session 存储到 mongodb
  //   url: config.mongodb// mongodb 地址
  // })
}))
const log4js= require('./config/logger');
const logger = log4js.getLogger();//根据需要获取logger
const errlogger = log4js.getLogger('err');
const othlogger = log4js.getLogger('oth');
console.log(logger);
console.log(errlogger);
console.log(othlogger);
log4js.useLogger(app,logger)//这样会自动记录每次请求信息，放在其他use上面
//手动记录，可以代替console.log
logger.info('test info 1')
othlogger.info('test info 2')
errlogger.error('test error 1')

// 路由
routes(app);

// 监听端口，启动程序
app.listen(config.port, function () {
  console.log(`${pkg.name} listening on port ${config.port}`)
})

