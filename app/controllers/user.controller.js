"use strict";
var Model = require('./../models/user.model');
var CustomError = require('./../utils/custom-error');
var mongoose = require('mongoose');


// Get All
function getAll(req, res, next){
  Model.getAll((err, objects)=>{
    if(err){return next(err);}
    if(!objects){return next(new CustomError('No data found',400));}

    res.status(200).json(objects);
  });
};

// Get single object by id
function getOneById(req, res, next){
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    return next(new CustomError('Invalid Id',400));
  }
  Model.getById(req.params.id,(err, object)=>{
    if(err){return next(err);}
    if(!object){return next(new CustomError('No data found', 400));}

    res.status(200).json(object);
  });
};

// Get single object by Email
function getOneByEmail(req, res, next){
  Model.getByEmail(req.params.email,(err, object)=>{
    if(err){return next(err);}
    if(!object){return next(new CustomError('No data found', 400));}

    res.status(200).json(object);
  });
};

// Create new object
function createObject(req, res, next){
  const newObject = new Model({
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    correo: req.body.correo,
    password: req.body.password,
    tipo: req.body.tipo,
    fechaNacimiento: req.body.fechaNacimiento,
    genero: req.body.genero,
    foto: req.body.foto,
    rutinas: req.body.rutinas
  });

  // Check if the user already exists
  Model.getByEmail(newObject.correo,(err, object)=>{
    if(err){return next(err);}
    if(object){return next(new CustomError('User already exists', 400));}

    // If the user does not exist, create a new one
    Model.createObject(newObject, next, (err, object)=>{
      if(err){return next(err);}

      res.status(200).json(object);
    });
  });
};

// Remove object
function removeObject(req, res, next){
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    return next(new CustomError('Invalid Id',400));
  }
  Model.removeObject(req.params.id, (err, object)=>{
    if(err){return next(err);}

    res.status(200).json(object);
  })
}

// Update object
function updateObject(req, res, next){
  const data = {
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    correo: req.body.correo,
    tipo: req.body.tipo,
    fechaNacimiento: req.body.fechaNacimiento,
    genero: req.body.genero,
    foto: req.body.foto,
    password: req.body.password,
    rutinas: req.body.rutinas
  };

  Model.updateObject(req.params.id, data, next, (err, object)=>{
    if(err){return next(err);}

    res.status(200).json(object);
  })
}

module.exports = {
    getAll: getAll,
    getOneById: getOneById,
    getOneByEmail:getOneByEmail,
    createObject: createObject,
    removeObject: removeObject,
    updateObject: updateObject
};
