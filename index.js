const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('hello, express')
})

var server = app.listen(4001,()=>{
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
})