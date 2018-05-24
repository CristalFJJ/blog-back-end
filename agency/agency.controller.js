'use strict';
const superagent = require('superagent');

function searchMusic(req,res,next){
  let content = req.query;
  let url =  `http://s.music.163.com/search/get/`;
  superagent.get(url)
            .query({
              s: content.s,
              type: content.type,
              limit: content.limit
            })
            .end((request,response)=>{
              res.json({code:200,data:response.text});
            })
            
}
// http://music.163.com/api/song/detail/?id=25706282&ids=%5B25706282%5D&csrf_token=
// http://s.music.163.com/search/get/?s=&type=1&limit=10&_=1527151428000?
module.exports = {
  searchMusic: searchMusic,
}