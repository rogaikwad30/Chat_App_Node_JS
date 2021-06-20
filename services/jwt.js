var jwt = require('jsonwebtoken')
const configs = require('../config.json')

module.exports.createToken = (id) => {
  return token = jwt.sign({ id }, configs.token_secret, { expiresIn: configs.token_life });
};

module.exports.createRefreshToken = (username) => {
  return token = jwt.sign({ username }, configs.refreshToken_secret, { expiresIn: configs.refreshToken_life });
};

module.exports.parseCookies  = (request) => {
  var list = {},
      rc = request.headers.cookie;
  rc && rc.split(';').forEach(function( cookie ) {
      var parts = cookie.split('=');
      list[parts.shift().trim()] = decodeURI(parts.join('='));
  });
  return list;
}

module.exports.verifyToken = async (req, res, next) => {
  const cookies = this.parseCookies(req);
  var token = cookies.jwt || "";
  var refreshToken = cookies.refreshJwt || "";
  
  try {
    if (!token) { 
      return res.status(401).json({"Message" : "You need to Login" }) 
    }
      const decrypt = await jwt.verify(token, configs.token_secret);
      req.user = { id : decrypt.id };
    next();
  } catch (err) {
    if(err.message.includes("jwt expired")){
      if (!refreshToken) {
        return res.status(500).json({ "Error": "Session Timed Out ....!  Login Again " });
      }
      try {
        const decryption = await jwt.verify(refreshToken, configs.refreshToken_secret );
        req.user = {
            id :  decryption.id
        };
        token = await this.createToken(decryption.id)
        refreshToken = await this.createRefreshToken(decryption.id)
        res.cookie('jwt', token, { httpOnly: true });
        res.cookie('refreshJwt', refreshToken, { httpOnly: true })
        next();
      } catch (error) {
        return res.send(error.message).status(401);
      }
    }
    else{
      return res.json({"Error" : "Invalid Token OR Token has been Tampered" , "Action" : "Login Again"}).status(401);
    } 
  }
};
