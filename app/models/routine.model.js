var mongoose = require('mongoose');

var routineSchema = mongoose.Schema({
  nameRoutine:{
    type: String,
    required: true
  }
});

var Routine = module.exports = mongoose.model('Routine', routineSchema);

//Get All
module.exports.getAll = function(callback){
  Routine.find(callback).sort({_id: -1});
};

//Get by ID
module.exports.getById = function(id, callback){
  Routine.findById(id, callback);
};

//Add Object
module.exports.createObject = function(newObject, callback){
  newObject.save(callback);
};

//Remove Object
module.exports.removeObject = function(id, callback){
  Routine.find({_id: id}).remove(callback);
};

//Update Object
module.exports.updateObject = function(id, data, callback){
  Routine.findById(id, function(err, obj){
    if(!obj){
      return next(new Error("Could not load Routine to update"))
    }else{
      obj.nameRoutine = data.nameActivity;

      obj.save(callback);
    }
  });
};
