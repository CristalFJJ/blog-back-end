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
  app.post('/blog/api/updateArticle',check.checkLogin,article.updateArticle); //更新文章
  app.get('/blog/api/searchArticle',article.searchArticle); //搜索文章
  app.get('/blog/api/searchOneArticle',article.searchOneArticle); //根据类别搜索具体
  app.get('/blog/api/listArticle',article.listArticle); //查询文章列表
  app.get('/blog/api/detailArticle',article.detailArticle) //查询文章具体信息
  app.post('/blog/api/deleteArticle',check.checkLogin,article.deleteArticle); //删除文章
  app.post('/blog/api/addComment',check.checkLogin,article.addComment); //添加评论
}

module.exports = articlesRoutes;