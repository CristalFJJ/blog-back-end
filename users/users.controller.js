'use strict';
const UsersModel   = require('./users.model');

const token = require('../utils/token-utils');
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
      console.log('check',doc);
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
    console.log(data);
    user.save(function(err,doc){
      console.log(doc);
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
      token.createToken(_data, function(err, token) {
        if(err) {
          console.error(err);
          return res.status(500).json({code:500,msg:err});
        }
        let user = new UsersModel(result);
        user.token = token;
        user.save();
        return res.json({code:200, token: token, info: _data});
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
      level: content.level || 2,
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
function login(req, res) {
  let selected = {
    userName:1,
    passWord:1,
    level:1,
    token:1
  }
  UsersModel.findOne({userName:req.body.userName},selected, function (err, account) {
    if(err){
      console.info("msg error: " + err);
      return res.status(500).json({code:500,msg:err});
    }
    if (!account) {
      return res.status(400).json({code:400,msg:'The account info is not registered.'}) ;
    }
    account.comparePassword(req.body.password, function(err, isMatch) {
      if (err) { return res.status(400).json({code:400,msg:err}); }
      if (!isMatch) {
        return res.status(400).json({code:400,msg:'The password is not correct.'});
      }
    })

  })
}
module.exports = {
  userRegister: userRegister,
  registerPreview: registerPreview,
}