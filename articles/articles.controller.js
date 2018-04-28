'use strict';
const ArticlesModel = require('./articles.model');
const moment = require('moment');
/**
 * 创建文章
 * @ description 接口描述
 * @ method post
 * @ link 接口地址
 * @ req {Object} 
 * @ res {number} code - 200
 */
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
    createdTime: moment().format('YYYY-MM-DD HH:mm:ss'),
    portrait: content.portrait || '',
    coverPicture: content.coverPicture || '',
    collect: [{useName:''}],
    message: [{msg:'',created:'',portrait:'',userName:'',children:[]}],
  }
  console.log('time',data.createdTime);
  let article = new ArticlesModel(data);
  console.log('article',article.createdTime);
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

function checkList(res,obj,query,total){
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

        if(docs.length == 0 && total > 0){
          let queryAgain = {
            rows: 10,
            page: page,
          }
          checkList(res,obj,queryAgain,total);
          return ;
        }

        let dataArr = [];
        docs.forEach(item=>{
          let objData = {
            classification: item.classification,
            createdTime: item.createdTime,
            title: item.title,
            userName: item.userName,
            _id: item._id
          }
          dataArr.push(objData);
        })
        return res.json({code:200,data:dataArr,total:total});
      })
  })
}
/**
 * 查询文章列表
 * @ description 接口描述
 * @ method get
 * @ link 接口地址
 * @ req {String} authorization - 参数描述(请求)
 * @ res {number} code - 200
 * @ res {Array} data - 参数描述(响应)
 * @ res {number} total - 总数
 */
async function listArticle(req,res,next){
  let content = req.query;
  let count = await checkTotal({});
  await checkList(res,{},content,count);
}


/**
 * 文章具体信息
 * @ description 接口描述
 * @ method get
 * @ link 接口地址
 * @ req {Object}  _id - 参数描述(请求)
 * @ res {number} code - 200
 * @ res {Object} data - 参数描述(响应)
 */

function detailArticle(req,res,next){
  let content = req.query;
  ArticlesModel.find({_id:content._id},function(err,docs){
    if(err){
      console.log(err);
      return res.json({code:500, msg:"SearchDetail fail"});
    }
    return res.json({code:200,data:docs[0]});
  })
}

/**
 * 删除文章
 * @ description 接口描述
 * @ method post
 * @ link 接口地址
 * @ req {Array}  _id - 参数描述(请求)
 * @ res {number} code - 200
 * @ res {Object} info - 参数描述(响应)
 */
function deleteArticle(req,res,next){
  let content = req.body;
  let _idArr = [];
  content.forEach(res=>{_idArr.push(res._id)});
  ArticlesModel.remove({_id:{$in:_idArr}},function(err,docs){
    if(err){
      console.log(err);
      return res.json({code:500, msg:"delete fail"});
    }
    return res.json({code:200,info:'delete success'});
  });
}

module.exports = {
  createArticle:createArticle,
  listArticle:listArticle,
  detailArticle:detailArticle,
  deleteArticle:deleteArticle,
}