const bodyParser = require('body-parser');
module.exports = function (app) {
  app.use(function(req, res, next) {
    //测试
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,content-type");
    res.header("Access-Control-Allow-Credentials", 'true');
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
  });
  
  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  app.get('/', function (req, res) {
    res.redirect('blog/api/posts')
  });
  app.use('/blog/api/loginUp', require('./loginUp'));
  app.use('/blog/api/loginIn', require('./loginIn'));
  app.use('/blog/api/loginOut', require('./loginOut'));
  app.use('blog/api/posts', require('./posts'));
  app.use('blog/api/comments', require('./comments'));
}
  // setup CORS
  
