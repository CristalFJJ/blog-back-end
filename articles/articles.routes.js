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
var article = require('./articles.controller.js');
var check = require('../middlewares/check.js');
function articlesRoutes(app) {
  app.post('/blog/api/createArticle',check.checkLogin,article.createArticle); //创建文章
  app.get('/blog/api/listArticle',check.checkLogin,article.listArticle); //查询文章列表
  app.get('/blog/api/detailArticle',check.checkLogin,article.detailArticle) //查询文章具体信息
  app.post('/blog/api/deleteArticle',check.checkLogin,article.deleteArticle); //删除文章
}

module.exports = articlesRoutes;