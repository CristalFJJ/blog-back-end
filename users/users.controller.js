'use strict';
const UsersModel   = require('./users.model');
const crypto = require('crypto');
const tokenFun = require('../utils/token-utils');
const moment = require('moment');
/**
 * 账户注册
 * @ description 接口描述
 * @ method post
 * @ link 接口地址
 * @ req {String} authorization - 参数描述(请求)
 * @ res {number} code - 200
 * @ res {json} info - 参数描述(响应)
 */
function registerCheck(data){
  return new Promise((resolve,reject)=>{
    UsersModel.findOne({userName:data.userName},function(err,doc){
      if(!doc){
        resolve(true);
      }else{
        reject(false);
      }
    });
  }).then((bol) => {
    return bol;
  }).catch((bol) => {
    return bol;
  })
}
function register(req,res,data){
  return new Promise((resolve,reject)=>{
    var obj = {};
    var user = new UsersModel(data);
    user.save(function(err,doc){
      if(err){
        reject(err);
      }
      obj.user = doc;
      resolve(obj);
    });
  }).then((obj) => {
    if(obj.user){
      var result = obj.user;
      var _data = {
        _id:result._id,
        userName: result.userName,
        level: result.level,
      };
      tokenFun.createToken(_data, function(err, token) {
        if(err) {
          console.error(err);
          return res.status(500).json({code:500,msg:err});
        }
        let user = new UsersModel(result);
        user.token = token;
        user.save();
        _data.token = token;
        return res.json({code:200, info: _data});
      });
    }else {
      return res.status(500).json({code:500, msg: "注册失败"});
    }
  }).catch((err) => {
    console.error(err);
    return res.status(500).json({code:500,msg:err});
  })
}
async function userRegister(req, res) {
  var content = req.body;
  if(!content.userName) return res.status(500).json({code:500,msg:"userName is null"});
  var data = {
    userName: content.userName,
    passWord: content.passWord,
    level: content.level || 'supreme',
    created: Date.now(),
    portrait: '/img/defaultAvatar.jpg'
  };
  let checkResult = await registerCheck(data);
  if(!checkResult){
    return res.json({code:202, msg:"该用户名已存在"});
  }
  await register(req,res,data);   
}

async function registerPreview(req, res){
  var content = req.query;
  if(!content.userName) return res.status(500).json({code:500,msg:"userName is null"});
  let checkResult = await registerCheck(content);
  if(!checkResult){
    return res.json({code:202, msg:"该用户名已存在"});
  }else{
    return res.json({code:200,msg:"该用户名可注册"});
  }
}

/**
 * 用户登录
 * @ description 接口描述
 * @ method post
 * @ link 接口地址
 * @ req {String} authorization - 参数描述(请求)
 * @ res {number} code - 200
 * @ res {json} info - 参数描述(响应)
 */
function loginIn(req, res) {
  let content = req.body;
  UsersModel.findOne({userName:content.userName}, function (err, doc) {
    if(err){
      return res.status(500).json({code:500,msg:err});
    }
    if (!doc) {
      return res.json({code:400,msg:'该用户暂未注册'}) ;
    }
    doc.comparePassword(content.passWord, function(err, isMatch) {
      if (err) { return res.status(400).json({code:400,msg:err}); }
      if (!isMatch) {
        return res.json({code:400,msg:'密码不正确'});
      }
      let _data = {
        _id:doc._id,
        userName: doc.userName,
        level: doc.level,
      };
      //登录更新token
      tokenFun.createToken(_data, function(err, token) {
        if(err) {
          console.error(err);
          return res.status(500).json({code:500,msg:err});
        }
        doc.token = token; //更新token
        doc.loginNum += 1; 
        doc.loginTime = moment().format('YYYY-MM-DD HH:mm:ss');
        doc.save();
        let data = {
          _id:doc._id,
          userName: doc.userName,
          level: doc.level,
          token: doc.token,
          portrait: doc.portrait,
          email: doc.email
        };
        return res.json({code:200,info: data});
      });
      
    })

  })
}
/**
 * 用户登出
 * @ description 接口描述
 * @ method post
 * @ link 接口地址
 * @ req {String} authorization - 参数描述(请求)
 * @ res {number} code - 200
 * @ res {json} info - 参数描述(响应)
 */
function loginOut(req, res) {
  let content = req.body;
  UsersModel.findOne({_id:content._id},{token:1}, function (err, doc) {
    doc.token = null;
    doc.save(function(err,doc){
      if(err){
        res.json({code:500, msg:"logout fail"});
      }else{
        res.json({code:200});
      }
    });
  })
}

/**
 * 查找用户
 * @ description 接口描述
 * @ method post
 * @ link 接口地址
 * @ req {String} authorization - 参数描述(请求)
 * @ res {number} code - 200
 * @ res {json} info - 参数描述(响应)
 */

function userFind(req,res){
  let content = req.query;
  UsersModel.findOne({_id:content._id}, function (err, docs) {
    if(err){
      return res.status(500).json({code:500,msg:err});
    }
    res.json({code:200,data:docs});
  })
}


/**
 * 更新资料
 * @ description 接口描述
 * @ method post
 * @ link 接口地址
 * @ req {String}  参数描述(请求)
 * @ res {number} code - 200
 * @ res {json} info - 参数描述(响应)
 */
function userUpDate(req,res,next){
  let content = req.body;
  let data = {
    portrait: content.portrait || '/img/defaultAvatar.jpg',
    email: content.email,
    remarks: content.remarks
  }
  UsersModel.update({_id:content._id},{$set:data},function(err,doc){
    if(err){
      res.json({code:500, msg:"update fail"});
    }else{
      res.json({code:200,info:doc});
    }
  })
}
/**
 * 更新密码
 * @ description 接口描述
 * @ method post
 * @ link 接口地址
 * @ req {String}  参数描述(请求)
 * @ res {number} code - 200
 * @ res {json} info - 参数描述(响应)
 */
function userUpDatePassWord(req,res,next){
  let content = req.body;
  let passWord = content.passWord;
  if(passWord && passWord.length<13){
    const hash = crypto.createHash('sha256');
    hash.update(passWord);
    passWord = hash.digest('hex');
  }
  let data = {
    passWord: passWord,
  }
  UsersModel.update({_id:content._id},{$set:data},function(err,doc){
    if(err){
      res.json({code:500, msg:"update fail"});
    }else{
      res.json({code:200,info:doc});
    }
  })
}

module.exports = {
  userRegister: userRegister,
  registerPreview: registerPreview,
  loginIn: loginIn,
  loginOut: loginOut,
  userFind: userFind,
  userUpDate: userUpDate,
  userUpDatePassWord: userUpDatePassWord
}