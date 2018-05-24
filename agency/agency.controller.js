'use strict';
const request = require('request');

function searchMusic(req,res,next){
  let content = req.query;
  console.log(`http://s.music.163.com/search/get/?s=${content.s}&type=${content.type}&limit=${content.limit}`);
  let options = {
    url: `http://s.music.163.com/search/get/?s=${content.s}&type=${content.type}&limit=${content.limit}`,
    headers: {
      'User-Agent': 'request'
    }
  };
  
  request(options, function (error, response, body) {
    console.log('response',response);
    console.log('body',body);
  })
}
// http://music.163.com/api/song/detail/?id=25706282&ids=%5B25706282%5D&csrf_token=
// http://s.music.163.com/search/get/?s=&type=1&limit=10&_=1527151428000?
module.exports = {
  searchMusic: searchMusic,
}