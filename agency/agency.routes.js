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
var agency = require('./agency.controller.js');

function agencyRoutes(app) {
  app.get('/blog/api/searchMusic',agency.searchMusic); //搜索音乐
};

module.exports = agencyRoutes;