/**
 * Token utils.
 *
 * @author    
 * @copyright 
 * @license	  
 */
'use strict';

/**
 * Module dependencies.
 */

var crypto = require('crypto');
var config = require('../config/default');
var jwt = require('jsonwebtoken');
/**
 * Extract the token from the header Authorization.
 *
 * @method extractTokenFromHeader
 * @param {Object} headers The request headers
 * @returns {String} the token
 * @private
 */
function extractTokenFromHeader(headers) {
  if (headers == null) throw new Error('Header is null');
  if (headers.authorization == null) throw new Error('Authorization header is null');

  var authorization = headers.authorization;
  var authArr = authorization.split(' ');
  var token;
  if (authArr.length == 2)
    token = authArr[1];
  else if (authArr.length == 1)
    token = authArr[0];
  else
    throw new Error('Authorization format error');
  return token;
}

/**
 * Create a new JWT token and stores it in redis with payload data for a particular period of time.
 *
 * @method createToken
 * @param {Object}   payload An additional information that we can pass with token e.g. {user: 2, admin: true}
 * @param {Function} cb      Callback function
 * @returns {Function} callback function `callback(null, token)` if successfully created
 */
function createToken(payload, cb) {
  if (payload != null && typeof payload !== 'object') {
    return cb(new Error('payload is not an Object'))
  }
  // const hash = crypto.createHash('sha256');
  // hash.update(JSON.stringify(payload));
  // hash.update(config.token.secret);
  // hash.update(''+Date.now());
  // var token = hash.digest('hex');
  var token = jwt.sign(payload, config.token.secret, {
    expiresIn: config.token.expiration
  });
  cb(null, token);
}

/**
 *
 * @method verifyToken
 * @param {Object}   headers The request headers
 * @param {Function} cb      Callback function
 * @returns {Function} callback function `callback(null, true)` if successfully deleted
 */
function verifyToken(headers, cb) {
  try {
    var token = extractTokenFromHeader(headers);
    console.info('Authorization: ' + token);
    if (token == null) {
      return cb(new Error('Token is null'));
    }
    jwt.verify(token, config.token.secret, function (err, decoded) {
      if (err) {
        return cb(err);
      } else {
        console.info('token: ' + decoded);
        return cb(null,decoded)
      }
    })
  } catch (err) {
    return cb(err);
  }
}

module.exports = {
  createToken: createToken,
  verifyToken: verifyToken,
};
