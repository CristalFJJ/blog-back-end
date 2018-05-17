'use strict';
const MessageModel = require('./messageBoard.model');
const moment = require('moment');

/**
 * 新增留言
 * @ description 接口描述
 * @ method post
 * @ link 接口地址
 * @ req {String} query 参数描述(请求)
 * @ res {number} code - 200
 * @ res {Object} data - 数据
 */
function createMessage(req,res,next){
  let content = req.body;
  let data = {
    userId: content.userId,
    msg: content.msg,
    created: Date.now(),
    createdTime: moment().format('YYYY-MM-DD HH:mm:ss'),
    portrait: content.portrait,
    userName: content.userName,
    site: content.site,
    email: content.email,
    level: content.level,
    children: []
  }
  let message = new MessageModel(data);
  message.save(function(err,doc){
    if(err){
      console.log(err);
      res.json({code:500, msg:"addMessage fail"});
    }else{
      res.json({code:200,data:doc});
    }
  })
}

/**查找总数 */
function checkTotal(){
  return new Promise((resolve,reject)=>{
    MessageModel.count({},function(err,count){
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
    MessageModel
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
            _id: item._id,
            userId: item.userId,
            msg: item.msg,
            createdTime: item.createdTime,
            portrait: item.portrait,
            userName: item.userName,
            site: item.site,
            email: item.email,
            level: item.level,
            children: item.children
          }
          dataArr.push(objData);
        })
        return res.json({code:200,data:dataArr,total:total});
      })
  })
}
/**
 * 查询留言列表
 * @ description 接口描述
 * @ method get
 * @ link 接口地址
 * @ req {String} authorization - 参数描述(请求)
 * @ res {number} code - 200
 * @ res {Array} data - 参数描述(响应)
 * @ res {number} total - 总数
 */
async function listMessage(req,res,next){
  let content = req.query;
  let count = await checkTotal();
  await checkList(res,{},content,count);
}

/**
 * 留言回复
 * @ description 接口描述
 * @ method post
 * @ link 接口地址
 * @ req {String} query 参数描述(请求)
 * @ res {number} code - 200
 * @ res {Object} data - 数据
 */
function messageReply(req,res,next){
  let content = req.body.data;
  let messageId = req.body.messageId;
  let replyObj = {
    userId: content.userId,
    msg: content.msg,
    createdTime: moment().format('YYYY-MM-DD HH:mm:ss'),
    portrait: content.portrait,
    userName: content.userName,
    site: content.site,
    email: content.email,
    level: content.level,
  }
  MessageModel.find({_id:messageId},function(err,doc){
    if(err){
      console.log(err);
    }
    let messageData = doc[0];
    messageData.children.push(replyObj);
    MessageModel.update({_id:messageId},{children:messageData.children},function(err,doc){
      if(err){
        res.json({code:500, msg:"update fail"});
      }else{
        res.json({code:200,info:doc});
      }
    })
  })
}
/**
* 删除留言
* @ description 接口描述
* @ method post
* @ link 接口地址
* @ req {String} query 参数描述(请求)
* @ res {number} code - 200
* @ res {Object} data - 数据
*/
function deleteMessage(req,res,next){
 let createdTime = req.body.createdTime;
 let messageId = req.body.messageId;

 MessageModel.find({_id:messageId},function(err,doc){
   if(err){
    console.log(err);
   }
   let messageData = doc[0];
   if(messageData.createdTime == createdTime){
    MessageModel.remove({_id:messageId},function(err,docs){
      if(err){
        console.log(err);
        return res.json({code:500, msg:"delete fail"});
      }
      return res.json({code:200,info:'delete success'});
    });
   }else{
     for(let i=0;i<messageData.children.length;i++){
       if(messageData.children[i].createdTime == createdTime){
        messageData.children.splice(i,1);
        break;
       }
     }
     MessageModel.update({_id:messageId},{children:messageData.children},function(err,doc){
      if(err){
        res.json({code:500, msg:"delete fail"});
      }else{
        res.json({code:200,info:doc});
      }
    })
   }
   
 })
}
module.exports = {
  listMessage: listMessage,
  createMessage: createMessage,
  deleteMessage: deleteMessage,
  messageReply: messageReply,

}