'use strict';
const ArticlesModel = require('./articles.model');

const tokenFun = require('../utils/token-utils');

function createArticle(req,res){
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

module.exports = {
  createArticle:createArticle
}