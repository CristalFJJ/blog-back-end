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
var Q = require('q');
var redis  = require('../config/redis');
var config = require('../config/config');
var baiduMap = config.baiduMap;

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
    if(payload != null && typeof payload !== 'object') { return cb(new Error('payload is not an Object')) }
    // const hash = crypto.createHash('sha256');
    // hash.update(JSON.stringify(payload));
    // hash.update(config.token.secret);
    // hash.update(''+Date.now());
    // var token = hash.digest('hex');
    var token = jwt.sign(payload, config.token.secret, { expiresIn: config.token.expiration });
    cb(null,token);
}

/**
 * Expires a token by deleting the entry in redis.
 *
 * @method expireToken
 * @param {Object}   headers The request headers
 * @param {Function} cb      Callback function
 * @returns {Function} callback function `callback(null, true)` if successfully deleted
 */
function expireToken(headers, cb) {
    try {
        var token = extractTokenFromHeader(headers);

        if(token == null) {return cb(new Error('Token is null'));}

        if(redis) {
            // delete token from redis
            redis.del(token, function (err, reply) {
                if (err) {
                    return cb(err);
                }

                if (!reply) {
                    return cb(new Error('Token not found'));
                }

                return cb(null, true);
            });
        } else {
            cb(null, true);
        }
    } catch (err) {
        return cb(err);
    }
}

/**
 * Verify if token is valid.
 *
 * @method verifyToken
 * @param {Object}   headers The request headers
 * @param {Function} cb      Callback function
 * @returns {Function} callback function `callback(null, JSON.parse(userData))` if token exist
 */
function verifyToken(headers, cb) {
    try {
        var token = extractTokenFromHeader(headers);
        console.info('Authorization: '+token);

        if(token == null) {return cb(new Error('Token is null'));}

        if(redis) {
            // gets the associated data of the token
            redis.get(token, function(err, userData) {
                if(err) {return cb(err);}

                if(!userData) {
                    console.info('error: =========');
                    return cb(new Error('Token not found'));
                }
                return cb(null, JSON.parse(userData));
            });
        } else {
            return cb(new Error('Redis failed'));
        }
    } catch (err) {
        return cb(err);
    }
}



/**
 * 获取的登录用户信息
 * @param token
 * @returns {promise|h.promise|*|k.promise|{then, catch, finally}|r.promise}
 */
function getRedisInfo(token) {
    var def = Q.defer();
    if(redis) {
        // gets the associated data of the token
        redis.get(token, function(err, userData) {
            if(err) {def.resolve(400);}

            if(!userData) {def.resolve(400);}

            var Datas = JSON.parse(userData);
            def.resolve(Datas);

        });
    } else {
        def.resolve(400);
    }
    return def.promise;
}

module.exports = {
    createToken: createToken,
    expireToken: expireToken,
    verifyToken: verifyToken,
    getRedisInfo: getRedisInfo
};

