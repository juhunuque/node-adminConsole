"use strict";
var User = require('./../models/user.model');
var CustomError = require('./../utils/custom-error');
var mongoose = require('mongoose');


function getAllUsers(req, res, next){
  User.getAll((err, objects)=>{
    if(err){return next(err);}
    if(!objects){return next(new CustomError('No users found',400));}

    res.status(200).json(objects);
  });
};

function getUser(req, res, next){
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    return next(new CustomError('Invalid Id',400));
  }
  User.getById(req.params.id,(err, object)=>{
    if(err){return next(err);}
    if(!object){return next(new CustomError('No user found', 400));}

    res.status(200).json(object);
  });
};

function createUser(req, res, next){
  const newUser = new User({
    nameUser: req.body.nameUser
  });

  User.createObject(newUser, (err, object)=>{
    if(err){return next(err);}

    res.status(200).json(object);
  });
};

function removeObject(req, res, next){
  User.removeObject(req.params.id, (err, object)=>{
    if(err){return next(err);}

    res.status(200).json(object);
  })
}

function updateObject(req, res, next){
  const data = {
    nameUser: req.body.nameUser
  };

  User.updateObject(req.params.id, data, (err, object)=>{
    if(err){return next(err);}

    res.status(200).json(object);
  })

}


module.exports = {
    getAllUsers: getAllUsers,
    getUser: getUser,
    createUser: createUser,
    removeObject: removeObject,
    updateObject: updateObject
};
