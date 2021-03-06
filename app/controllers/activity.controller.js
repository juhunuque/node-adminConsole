"use strict";
var Model = require('./../models/activity.model');
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

// Create new object
function createObject(req, res, next){
  const newObject = new Model({
    nombreActividad: req.body.nombreActividad,
    detalle: req.body.detalle,
    duracion: req.body.duracion,
    repeticiones: req.body.repeticiones,
    peso: req.body.peso
  });

  Model.createObject(newObject, (err, object)=>{
    if(err){return next(err);}

    res.status(200).json(object);
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
    nombreActividad: req.body.nombreActividad,
    detalle: req.body.detalle,
    duracion: req.body.duracion,
    repeticiones: req.body.repeticiones,
    peso: req.body.peso
  };

  Model.updateObject(req.params.id, data, (err, object)=>{
    if(err){return next(err);}

    res.status(200).json(object);
  })
}

module.exports = {
    getAll: getAll,
    getOneById: getOneById,
    createObject: createObject,
    removeObject: removeObject,
    updateObject: updateObject
};
