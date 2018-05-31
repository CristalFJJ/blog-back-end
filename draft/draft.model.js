'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');


/**
 * Mobile Schema
 */
var DraftSchema = new mongoose.Schema({
  userName: { //作者名称
    type: String,
    trim: true,
    required: true
  },
  level: { // 用户级别，0:超级管理员, 1:一级，2:二级
    type: mongoose.Schema.Types.Mixed,
  },
  portrait: { //用户头像
    type: String,
    trim: true
  },
  title:{ //文章标题
    type: String,
    trim: true
  },
  content:{ //文章内容
    type: String,
  },
  classification:{ //文章分类
    type: String,
  },
  coverPicture:{ //文章封面图片
    type: String, 
  },
  label:{ //标签
    type: String,
  },
  upDated: { //更新日期
    type: Date
  },
  created: { //创建日期
    type: Date,
  },
  createdTime:{ //更新日期(格式化)
    type: String,
  },
  upDatedTime:{ //创建日期(格式化)
    type: String,
  }
  
});
/**
 * Pre-save hook (execute before each user.save() call)
 */
module.exports = mongoose.model('draft', DraftSchema);