var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  nameUser:{
    type: String,
    required: false
  }
});

var User = module.exports = mongoose.model('User', userSchema);

//Get All
module.exports.getAll = function(callback){
  User.find(callback).sort({_id: -1});
};

//Get by ID
module.exports.getById = function(id, callback){
  User.findById(id, callback);
};

//Add Object
module.exports.createObject = function(newObject, callback){
  newObject.save(callback);
};

//Remove Object
module.exports.removeObject = function(id, callback){
  User.find({_id: id}).remove(callback);
};

//Update Object
module.exports.updateObject = function(id, data, callback){
  User.findById(id, function(err, obj){
    if(!obj){
      return next(new Error("Could not load User to update"))
    }else{
      obj.nameUser = data.nameUser;

      obj.save(callback);
    }
  });
};
