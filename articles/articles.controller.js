'use strict';
const ArticlesModel = require('./articles.model');

const tokenFun = require('../utils/token-utils');

function createArticle(req,res,next){
  let content = req.body;
  if(!content.userName) return res.status(500).json({code:500,msg:"userName is null"});
  let data = {
    userName: content.userName,
    level: content.level,
    title: content.title,
    content: content.content,
    classification: content.classification,
    label: content.label,
    created: Date.now(),
    portrait: content.portrait || '',
    coverPicture: content.coverPicture || '',
    collect: [{useName:''}],
    message: [{msg:'',created:'',portrait:'',userName:'',children:[]}],
  }
  let article = new ArticlesModel(data);
  article.save(function(err,doc){
    if(err){
      res.json({code:500, msg:"create fail"});
    }else{
      res.json({code:200,info:doc});
    }
  })
}
function checkTotal(obj){
  return new Promise((resolve,reject)=>{
    ArticlesModel.count(obj,function(err,count){
      if(err){
        reject(err);
      }
      resolve(count);
    })
  })
}
function checkDetail(res,obj,query,total){
  return new Promise((resolve,reject)=>{
    let page = query.page-1> 0 ? query.page-1: 0;
    ArticlesModel
      .find(obj)
      .skip(parseInt(page*query.rows))
      .limit(parseInt(query.rows))
      .sort({created:'desc'})
      .exec(function(err,docs){
        if(err){
          console.log(err);
          return res.json({code:500, msg:"search fail"});
        }
        return res.json({code:200,data:docs,total:total});
      })
  })
}
async function listArticle(req,res,next){
  let content = req.query;
  let count = await checkTotal({});
  await checkDetail(res,{},content,count);
}

module.exports = {
  createArticle:createArticle,
  listArticle:listArticle,
}