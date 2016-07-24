var mongoose = require('mongoose');

var activitySchema = mongoose.Schema({
  nameActivity:{
    type: Number,
    required: true
  }
});

var Activity = module.exports = mongoose.model('Activity', userSchema);

//Get All
module.exports.getAll = function(callback){
  Activity.find(callback).sort({_id: -1});
};

//Get by ID
module.exports.getById = function(id, callback){
  Activity.findById(id, callback);
};

//Add Object
module.exports.createObject = function(newObject, callback){
  newObject.save(callback);
};

//Remove Object
module.exports.removeObject = function(id, callback){
  Activity.find({_id: id}).remove(callback);
};

//Update Object
module.exports.updateObject = function(id, data, callback){
  Activity.findById(id, function(err, obj){
    if(!obj){
      return next(new Error("Could not load Activity to update"))
    }else{
      obj.nameActivity = data.nameActivity;

      obj.save(callback);
    }
  });
};
