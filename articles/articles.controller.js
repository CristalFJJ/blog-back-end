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
    describe: content.describe,
    content: content.content,
    classification: content.classification,
    label: content.label,
    created: Date.now(),
    createdTime: moment().format('YYYY-MM-DD HH:mm:ss'),
    portrait: content.portrait || '',
    coverPicture: content.coverPicture || '',
    collect: [{useName:''}],
    message: [{msg:'',createdTime:'',portrait:'',userName:'',site:'',email:'',children:[]}],
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
/**
 * 更新文章
 * @ description 接口描述
 * @ method post
 * @ link 接口地址
 * @ req {Object} 
 * @ res {number} code - 200
 */
function updateArticle(req,res,next){
  let content = req.body;
  if(!content.userName) return res.status(500).json({code:500,msg:"userName is null"});
  let data = {
    userName: content.userName,
    level: content.level,
    title: content.title,
    describe: content.describe,
    content: content.content,
    classification: content.classification,
    label: content.label,
    upDated: Date.now(),
    upDatedTime: moment().format('YYYY-MM-DD HH:mm:ss'),
    portrait: content.portrait || '',
    coverPicture: content.coverPicture || '',
    collect: [{useName:''}],
    message: [{msg:'',createdTime:'',portrait:'',userName:'',site:'',email:'',children:[]}],
  }
  ArticlesModel.update({_id:content._id},{$set:data},function(err,doc){
    if(err){
      res.json({code:500, msg:"update fail"});
    }else{
      res.json({code:200,info:doc});
    }
  })
}

/**查找总数 */
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
            rows: query.rows,
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
            describe: item.describe,
            coverPicture: item.coverPicture,
            _id: item._id
          }
          dataArr.push(objData);
        })
        console.log(dataArr);
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
  let obj = {};
  if(content.searchClass){
    obj.classification = content.searchClass;
  }
  let count = await checkTotal(obj);
  await checkList(res,obj,content,count);
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
  console.log(content);
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

/**
 * 搜索文章(模糊)
 * @ description 接口描述
 * @ method get
 * @ link 接口地址
 * @ req {String} query 参数描述(请求)
 * @ res {number} code - 200
 * @ res {Object} data - 数据
 */
function searchArticle(req,res,next){ //只根据文章标题
  let content = req.query;
  let reg = new RegExp(content.content, 'i') //不区分大小写
  if(content.content == '') return;
  let obj = {
    title: {$regex : reg},//多条件，数组
  }
  if(content.searchClass){
    obj.classification = content.searchClass
  }
  ArticlesModel.find(
    obj,
    {title:1}
  )
  .limit(10)
  .sort({created:'desc'})
  .exec((err,docs)=>{
    if(err){
      console.log(err);
      return res.json({code:500, msg:"search fail"});
    }
    return res.json({code:200,data:docs});
  })
}

function searchOneArticle(req,res,next){
  let content = req.query;
  let type = content.type;
  let value = content.value;
  ArticlesModel.findOne({[type]:value},function(err,docs){
    if(err){
      console.log(err);
      return res.json({code:500, msg:"search one fail"});
    }
    return res.json({code:200,data:docs});
  })
}

module.exports = {
  createArticle: createArticle,
  updateArticle: updateArticle,
  listArticle: listArticle,
  detailArticle: detailArticle,
  deleteArticle: deleteArticle,
  searchArticle: searchArticle,
  searchOneArticle: searchOneArticle,
}