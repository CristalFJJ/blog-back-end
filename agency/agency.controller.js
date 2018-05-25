'use strict';
const superagent = require('superagent');
const songUrl = require('./songUrl');
function searchMusic(req,res,next){
  let content = req.query;
  let url =  `http://music.163.com/api/search/pc`;
  let detailUrl = 'http://music.163.com/api/song/detail/';
  superagent
    .post(url)
    .set({
      "Content-Type": "application/x-www-form-urlencoded",
      "Cookie": "appver=2.0.2",
      "Referer": "http://music.163.com",
    })
    .send({
      s: content.s,
      type: content.type,
      limit: 100
    })
    .end((err,response)=>{
      let arr = JSON.parse(response.text).result.songs;
      for(let i=0;i<arr.length;i++){
        if(arr[i].artists[0].name == content.singer){
          let url = songUrl(content.s);
          res.json({code:200,data:url});
          break;
        }
      }
    })     
}
module.exports = {
  searchMusic: searchMusic,
}