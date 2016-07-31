var mongoose = require('mongoose');

var routineSchema = mongoose.Schema({
    nombreRutina:{
      type: String,
      required: true,
      default: ""
    },
    rondas:{
      type: Number
    },
    detalle:{
      type: String
    },
    tiempoTotal:{
      type: Number
    },
    tiempoEntreActividades:{
      type: Number
    },
    tiempreEntreRondas:{
      type: Number
    },
    reqTiempo:{
      type: Number
    },
    reqPeso:{
      type: Number
    },
    reqCant:{
      type: Number
    },
    tema:{
      type: Number
    },
    actividades:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Activity"
    }]
});

var Routine = module.exports = mongoose.model('Routine', routineSchema);

//Get All
module.exports.getAll = function(callback){
  Routine.find(callback)
  .populate('actividades')
  .sort({_id: -1});
};

//Get by ID
module.exports.getById = function(id, callback){
  Routine.findById(id, callback)
  .populate('actividades');
};

//Add Object
module.exports.createObject = function(newObject, next, callback){
  newObject.save((error, newObj)=>{
    if(error){return next(err);}

    Routine.findById(newObj.id, callback)
    .populate('actividades');
  });
};

//Remove Object
module.exports.removeObject = function(id, callback){
  Routine.find({_id: id}).remove(callback);
};

//Update Object
module.exports.updateObject = function(id, data, next, callback){
  Routine.findById(id, function(err, obj){
    if(!obj){
      return next(new Error("Could not load Routine to update"))
    }else{
      obj.nombreRutina = data.nombreRutina;
      obj.rondas = data.rondas;
      obj.detalle = data.detalle;
      obj.tiempoTotal = data.tiempoTotal;
      obj.tiempoEntreActividades = data.tiempoEntreActividades;
      obj.tiempreEntreRondas = data.tiempreEntreRondas;
      obj.reqTiempo = data.reqTiempo;
      obj.reqPeso = data.reqPeso;
      obj.reqCant = data.reqCant;
      obj.tema = data.tema;
      obj.actividades = data.actividades;

      obj.save((error, newObj)=>{
        if(error){return next(err);}

        Routine.findById(newObj.id, callback)
        .populate('actividades');
      });
    }
  });
};
