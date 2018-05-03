'use strict';
/**
 * users routes.
 *
 * @author    
 * @copyright 
 * @license	  
 */

/**
 * Module dependencies.
 */
var users     = require('./users.controller.js');
function setUsersRoutes(app) {
  app.route('/blog/api/registerPreview').get(users.registerPreview); //验证用户名是可用
  app.route('/blog/api/userRegister').post(users.userRegister); //注册
  app.route('/blog/api/loginIn').post(users.loginIn); //登录
  app.route('/blog/api/loginOut').post(users.loginOut); //登出
  app.route('/blog/api/userFind').get(users.userFind); //查找用户
  app.route('/blog/api/userUpDate').post(users.userUpDate); //修改资料
  app.route('/blog/api/userUpDatePassWord').post(users.userUpDatePassWord); //修改密码
}

module.exports = setUsersRoutes;