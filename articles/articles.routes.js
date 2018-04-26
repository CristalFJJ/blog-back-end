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
function articlesRoutes(app) {
  app.route('/blog/api/createArticle').post(article.createArticle); //创建文章
  
}

module.exports = articlesRoutes;