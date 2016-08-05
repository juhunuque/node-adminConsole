"use strict";
var request = require('request');
var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('./../config/configSecret');
var CustomError = require('./../utils/custom-error');

// Login, returns an app token
function loginProcess(req, res, next){
  if(!req.body.token){return next(new CustomError('Server needs mandatory a token',400))}

  evaluateFbToken(req.body.token).then((data)=>{
    res.status(200).json({appToken: createAppToken(data.email)});
  },(error)=>{
    return next(new CustomError(error.message,error.status))
  })
};


// Evaluate if the token is a FB valid token
function evaluateFbToken(token){
  return new Promise((resolve, reject)=>{
    const fbCheckUrl = "https://graph.facebook.com/me?access_token="+token;
    request(fbCheckUrl, function (error, response, body) {
      if(error){reject({
        message: 'Error validating the token',
        status: 500
      })}
      if(response.statusCode===200){
        resolve({
          email: JSON.parse(body).email
        });
      }else{
        reject({
          message: 'Not authorized: ' + JSON.parse(body).error.message,
          status: 401
          });
      }
    })
  })
}

// Create an app token (JWT) if the FB token is valid
function createAppToken(user){
  var payload = {
    sub: user,
    iat: moment().unix(),
    exp: moment().add(1, "days").unix(),
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
}

// Check if there is a valid auth code in the header
function isAuthenticated(req, res, next){
  if(!req.headers.authorization) {return next(new CustomError('Not token included',403))}

  var token = req.headers.authorization.split(" ")[1];
  var payload = jwt.decode(token, config.TOKEN_SECRET);

  if(payload.exp <= moment().unix()) {return next(new CustomError('Token expired',401))}

  next();
}

module.exports = {
    loginProcess: loginProcess,
    isAuthenticated: isAuthenticated
};
