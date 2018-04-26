const tokenFun = require('../utils/token-utils');
module.exports = {
  checkLogin: function checkToken (req, res, next) {
    tokenFun.verifyToken(req.headers, function(err, success) {
      if (err) {
        return res.status(401).json({code:401,msg:err});
      }
      if(success) {
        next();
      } else {
        return res.json({code:401, msg:"logout error"});
      }
    });
    
  },
}