"use strict";
var Model = require('./../models/routine.model');
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
    nombreRutina: req.body.nombreRutina,
    rondas: req.body.rondas,
    detalle: req.body.detalle,
    tiempoTotal: req.body.tiempoTotal,
    tiempoEntreActividades: req.body.tiempoEntreActividades,
    tiempoEntreRondas: req.body.tiempoEntreRondas,
    reqTiempo: req.body.reqTiempo,
    reqPeso: req.body.reqPeso,
    reqCant: req.body.reqCant,
    tema: req.body.tema,
    actividades: req.body.actividades
  });

  Model.createObject(newObject, next, (err, object)=>{
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
    nombreRutina: req.body.nombreRutina,
    rondas: req.body.rondas,
    detalle: req.body.detalle,
    tiempoTotal: req.body.tiempoTotal,
    tiempoEntreActividades: req.body.tiempoEntreActividades,
    tiempoEntreRondas: req.body.tiempoEntreRondas,
    reqTiempo: req.body.reqTiempo,
    reqPeso: req.body.reqPeso,
    reqCant: req.body.reqCant,
    tema: req.body.tema,
    actividades: req.body.actividades
  };

  Model.updateObject(req.params.id, data, next, (err, object)=>{
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
