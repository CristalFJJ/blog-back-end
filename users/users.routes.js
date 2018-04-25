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
}

module.exports = setUsersRoutes;