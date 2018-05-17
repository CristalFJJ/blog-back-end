'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');


/**
 * Mobile Schema
 */
var MessageSchema = new mongoose.Schema({
  userName: { //用户名称
    type: String,
    trim: true,
    required: true
  },
  userId:{ //用户ID
    type: String,
    trim: true,
  },
  level: { // 用户级别，supreme:超级管理员, 1:一级，2:二级
    type: mongoose.Schema.Types.Mixed,
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
  created: { //创建日期
    type: Date,
  },
  createdTime:{ //更新日期(格式化)
    type: String,
  },
  msg:{ // 留言
    type: String,
    trim: true
  },
  children:{ //回复
    type: Array,
  }
  
});


/**
 * Pre-save hook (execute before each user.save() call)
 */
module.exports = mongoose.model('Message', MessageSchema);