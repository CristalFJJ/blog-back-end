'use strict';

/**
 * Module dependencies.
 */
var crypto = require('crypto');
var mongoose = require('mongoose');


/**
 * Mobile Schema
 */
var UsersSchema = new mongoose.Schema({
  userName: { //用户名称
    type: String,
    trim: true,
    required: true
  },
  passWord: {
    type: String,
    required: true
  },
  level: { // 用户级别，supreme:超级管理员, 1:一级，2:二级
    type: String || Number,
    default: 'supreme'
  },
  portrait: { //用户头像
    type: String,
    trim: true
  },
  phone: { //电话
    type: String,
    trim: true
  },
  loginNum :{ //登录次数
    type: Number,
    default: 0
  },
  loginTime :{ //最近登录时间
    type: String,
  },
  email: { //邮箱
    type: String,
    trim: true
  },
  site:{ //个人网站
    type: String,
    trim: true
  },
  remarks: { //备注信息
    type: String,
    trim: true
  },
  updated: { //更新日期
    type: Date
  },
  created: { //创建日期
    type: Date,
  },
  token:{
    type: String,
  }
});


/**
 * Pre-save hook (execute before each user.save() call)
 */
UsersSchema.pre('save', function (next) {
  if(this.passWord && this.passWord.length<13){
    const hash = crypto.createHash('sha256');
    hash.update(this.passWord);
    this.passWord = hash.digest('hex');
  }
  next();
});

UsersSchema.methods.comparePassword = function (passWord, cb) {
  const hash = crypto.createHash('sha256');
  hash.update(passWord);
  var pwdHash = hash.digest('hex');
  if (pwdHash === this.passWord) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// UsersSchema.virtual('is_valid').get(function(){
//   if(this.name){
//     return true;
//   }
//   return false;
// });

// UsersSchema.statics.find_by_openid = function(openid, cb) {
//   return this.findOne({
//     wx_token: openid
//   }, cb);
// };
module.exports = mongoose.model('users', UsersSchema);
