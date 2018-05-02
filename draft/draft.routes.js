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
var draft = require('./draft.controller.js');
var check = require('../middlewares/check.js');
function draftRoutes(app) {
  app.post('/blog/api/createDraft',check.checkLogin,draft.createDraft); //创建草稿
  app.get('/blog/api/listDraft',check.checkLogin,draft.listDraft); //草稿列表
  app.get('/blog/api/searchDraft',check.checkLogin,draft.searchDraft); //搜索草稿
  app.get('/blog/api/searchOneDraft',check.checkLogin,draft.searchOneDraft); //根据类别搜索具体
  app.get('/blog/api/detailDraft',check.checkLogin,draft.detaildraft) //查询草稿具体信息
  app.post('/blog/api/deleteDraft',check.checkLogin,draft.deletedraft); //删除草稿
}

module.exports = draftRoutes;