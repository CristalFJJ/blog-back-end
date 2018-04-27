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
  app.get('/blog/api/listArticle',check.checkLogin,article.listArticle); //创建文章
}

module.exports = articlesRoutes;