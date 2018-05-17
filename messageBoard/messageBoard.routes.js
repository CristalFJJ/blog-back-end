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
var messageBoard     = require('./messageBoard.controller.js');
var check = require('../middlewares/check.js');
function setMessageRoutes(app) {
  app.post('/blog/api/createMessage',check.checkLogin,messageBoard.createMessage); //新增留言
  app.get('/blog/api/listMessage',messageBoard.listMessage) //查询留言列表
  app.post('/blog/api/deleteMessage',check.checkLogin,messageBoard.deleteMessage); //删除留言
  app.post('/blog/api/messageReply',check.checkLogin,messageBoard.messageReply); //留言回复
}
module.exports = setMessageRoutes;