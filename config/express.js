/**
 * Express configuration.
 *
 * @author    
 * @copyright 
 * @license	  
 */
'use strict';

/**
 * Module dependencies.
 */
const cors           = require('cors');
const path           = require('path');
const helmet         = require('helmet');
const express        = require('express');
const bodyParser     = require('body-parser');
const pathUtils      = require('../utils/path-utils');
const config         = require('./config');
const log4js= require('./logger');
const logger = log4js.getLogger();//根据需要获取logger


/**
 * Initialize application middleware.
 *
 * @method initMiddleware
 * @param {Object} app The express application
 * @private
 */
function initMiddleware(app) {
    // Showing stack errors
    app.set('showStackError', true);
    // Enable jsonp
    app.enable('jsonp callback');

    log4js.useLogger(app,logger)//这样会自动记录每次请求信息，放在其他use上面
    // Request body parsing middleware should be above methodOverride
    app.use(bodyParser.json({limit: "2mb"}));
    app.use(bodyParser.urlencoded({limit:'2mb', extended: true,keepExtensions:true}));

/**
 * Configure Helmet headers configuration.
 *
 * @method initHelmetHeaders
 * @param {Object} app The express application
 * @private
 */
function initHelmetHeaders(app) {
    // Use helmet to secure Express headers
    app.use(helmet.frameguard());
    app.use(helmet.xssFilter());
    app.use(helmet.noSniff());
    app.use(helmet.ieNoOpen());
    app.disable('x-powered-by');
}

/**
 * Configure CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests.
 *
 * @method initCrossDomain
 * @param {Object} app The express application
 * @private
 */
function initCrossDomain(app) {
    // setup CORS
    app.use(cors());
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
      res.header("Access-Control-Allow-Headers", "X-Requested-With,content-type");
      res.header("Access-Control-Allow-Credentials", 'true');
      res.header("X-Powered-By",' 3.2.1');
      res.header("Content-Type", "application/json;charset=utf-8");
      if (req.method == 'OPTIONS') {
        res.sendStatus(200);
      } else {
        next();
      }
    });
}

/**
 * Configure app modules config files.
 *
 * @method initGonfig
 * @param {Object} app The express application
 * @private
 */
function initGonfig(app) {
    // Globbing config files
    pathUtils.getGlobbedPaths(path.join(__dirname, '../config/*.config.js')).forEach(function (routePath) {
      require(path.resolve(routePath))(app);
    });
}

/**
 * Configure app routes.
 *
 * @method initRoutes
 * @param {Object} app The express application
 * @private
 */
function initRoutes(app) {
    // Globbing routing files
    pathUtils.getGlobbedPaths(path.join(__dirname, '../**/*.routes.js')).forEach(function (routePath) {
        require(path.resolve(routePath))(app);
    });
}

/**
 * Configure error handling.
 *
 * @method initErrorRoutes
 * @param {Object} app The express application
 * @private
 */
function initErrorRoutes(app) {
    // Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
    app.use(function (err, req, res, next) {
        // If the error object doesn't exists
        if (!err) return next();

        // Log it
        console.error('Internal error(%d): %s', res.statusCode, err.stack);

        // Redirect to error page
        res.sendStatus(500);
    });

    // Assume 404 since no middleware responded
    app.use(function (req, res) {
        // Redirect to not found page
        res.sendStatus(404);
    });
}

/**
 * Populate DB with sample data.
 *
 * @method initDB
 * @private
 */
function initDB() {
/*    if(config.seedDB) {
        require('./seed');
    }*/
}


/**
 * Initialize the Express application.
 *
 * @method init
 * @returns {Object} the express application
 */
function init() {
    // Initialize express app
    var app = express();
    
    // Initialize Express middleware
    initMiddleware(app);

    // Initialize Helmet security headers
    initHelmetHeaders(app);

    // Initialize CORS
    initCrossDomain(app);

    // Initialize config
    initGonfig(app);

    // Initialize routes
    initRoutes(app);

    // Initialize error routes
    initErrorRoutes(app);

    // Initialize DB with sample data
    initDB();

    return app;
}

module.exports.init = init;
