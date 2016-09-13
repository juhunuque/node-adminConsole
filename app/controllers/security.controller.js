"use strict";
var request = require('request');
var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('./../config/configSecret');
let CustomError = require('./../utils/custom-error');
var User = require('./../models/user.model');
var bcrypt = require('bcrypt');

// Login using Facebook process, returns an app token
function loginFbProcess(req, res, next){
  if(!req.body.token){return next(new CustomError('Server needs mandatory a token',400))}

  evaluateFbToken(req.body.token).then((data)=>{
    res.status(200).json(
      {appToken: createAppToken(data.email),
        email: data.email,
        name: data.name,
        type: data.type,
        picture: data.picture
      });
  },(error)=>{
    return next(new CustomError(error.message,error.status))
  })
};


// Evaluate if the token is a FB valid token
function evaluateFbToken(token){
  return new Promise((resolve, reject)=>{
    const fbCheckUrl = "https://graph.facebook.com/me?access_token="+token+'&fields=email,picture,name';
    request(fbCheckUrl, function (error, response, body) {
      if(error){reject({
        message: 'Error validating the token',
        status: 500
      })}
      if(response.statusCode===200){
        const bodyFb = JSON.parse(body);
        const picture = bodyFb.picture.data.url || '';

        User.getByEmail(bodyFb.email,(err, object)=>{
          if(err){reject(err);}
          if(!object){
            reject({
              message: 'Not authorized: User not registered',
              status: 401
              });
            }

            resolve({
              id: bodyFb.id,
              email: bodyFb.email,
              name: bodyFb.name,
              type: object.tipo,
              picture: picture
            });
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

// Login using credentials process, returns an app token
function loginProcess(req, res, next){
  if(!req.body.email || !req.body.password){return next(new CustomError('Server needs mandatory the user email and password',400))}

  evaluateUserCredentials(req.body.email, req.body.password).then((data)=>{
    res.status(200).json({
      appToken: createAppToken(data.email),
      email: data.email,
      name: data.name,
      type: data.type,
      picture: data.picture
    });
  },(error)=>{
    return next(new CustomError(error.message,error.status))
  })
}

// Evaluate if the user exists and the password is correct
function evaluateUserCredentials(email, password){
  return new Promise((resolve, reject) =>{
    User.getByEmail(email,(err, object)=>{
        if(err){reject(err);}
        if(!object){
          reject({
            message: 'Not authorized: User not registered',
            status: 401
          });
        }

  bcrypt.compare(password, object.password, function(err, isMatch) {
          if (err){return reject(err);}
          if (!isMatch){reject(new CustomError('Password invalid', 400));}

          resolve({
            email: object.correo,
            name: `${object.nombre} ${object.apellidos}`,
            type: object.tipo,
            picture: object.foto
          });
      });
    });
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

// When the password has been restarted, invoke this method in order to update a new one
function updatePassword(req, res, next){
  const data = new User({
    password: req.body.password,
  });

  User.updatePassword(req.params.id, data, next, (err, object)=>{
    if(err){return next(err);}

    res.status(200).json({'message': 'Password updated successfully'});
  })
}

// Reset a user password
function resetPassword(req, res, next){
  const data = new User({
    password: '',
  });

  User.updatePassword(req.params.id, data, next, (err, object)=>{
    if(err){return next(err);}

    res.status(200).json({'message': 'Password restarted successfully'});
  })
}


module.exports = {
    loginFbProcess: loginFbProcess,
    loginProcess: loginProcess,
    updatePassword: updatePassword,
    resetPassword: resetPassword,
    isAuthenticated: isAuthenticated
};
