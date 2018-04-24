'use strict';

/**
 * Module dependencies.
 */
var crypto   = require('crypto');
var mongoose = require('mongoose');
var Roles = require('../userRoles/userRoles.model');
var Company = require('../company/company.model');


/**
 * Mobile Schema
 */
var UsersSchema = new mongoose.Schema({
    name: { //用户名称
        type: String,
        trim: true,
    },
    password: {
        type: String,
        required: true
    },
    level :{ // 用户级别，0:超级管理员, 1:一级，2:二级
        type: Number,
        default: 0
    },
    is_admin:{//是否超级管理员
        type: Boolean,
        default: false
    },
    useType:{//用户类型,  "0" 简约,  1:标准, 2:联调
        type: Number,
        default: 0
    },
    avatar: { //用户头像
        type: String,
        trim: true
    },
    phone:{ //电话
        type: String,
        trim: true
    },
    email:{ //邮箱
        type: String,
        trim: true
    },
    remarks:{ //备注信息
        type: String,
        trim: true
    },
    systemName:{ //系统名称
        type: String,
        trim: true
    },
    updated: { //更新日期
        type: Date
    },
    created: { //创建日期
        type: Date,
        default: Date.now
    }
});


/**
 * Pre-save hook (execute before each user.save() call)
 */
UsersSchema.pre('save', function(next) {
    var mobile = this;
    const hash = crypto.createHash('sha256');
    hash.update(mobile.password);
    mobile.password = hash.digest('hex');
    next();
});

UsersSchema.methods.comparePassword = function(password, cb) {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    var pwdHash = hash.digest('hex');
    if (pwdHash === this.password) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

UsersSchema.virtual('is_valid').get(function(){
  if(this.mobile && this.mobile.length>10){
    return true;
  }
  return false;
});

// UsersSchema.statics.find_by_openid = function(openid, cb) {
//   return this.findOne({
//     wx_token: openid
//   }, cb);
// };
module.exports = mongoose.model('Users', UsersSchema);
