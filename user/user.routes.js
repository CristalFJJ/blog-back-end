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
var authentication = require('../authentication/authentication.controller.js');
function setUsersRoutes(app) {
    app.route('/windelephant/api/users/register').post(users.userRegister);
    app.route('/windelephant/api/users/resetpwd').post(users.usersUpdate);
    app.route('/windelephant/api/users/password/reset').post(users.userpwdReset);
    app.route('/windelephant/api/users/login').post(users.login);
    app.route('/windelephant/api/users/logout').post(users.logout);
    app.route('/windelephant/api/users/exit').post(users.usersExit);
    app.route('/windelephant/api/users/list').get(authentication.isAuthenticated, users.usersList);
    app.route('/windelephant/api/users/roles').post(authentication.isAuthenticated, users.userRoles);
    app.route('/windelephant/api/users/info/detail').get(authentication.isAuthenticated, users.userDetail);
    app.route('/windelephant/api/users/get/detail/info').post(authentication.isAuthenticated, users.userGetRoles);
    app.route('/windelephant/api/users/get/roles/info').post(authentication.isAuthenticated, users.userGetRolesInfo);
    app.route('/windelephant/api/users/info/create').post(users.userInfoCreate);
    app.route('/windelephant/api/users/info/update').post(users.usersInfoUpdate);
    app.route('/windelephant/api/users/info/delete').post(authentication.isAuthenticated, users.userDelete);
    app.route('/windelephant/api/user/register/admin').post(users.userRegisterAdmin);

    // app.route('/windelephant/api/users/pre').get(users.usersPre);
}

module.exports = setUsersRoutes;