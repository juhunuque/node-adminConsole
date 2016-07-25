var mongoose = require('mongoose');

var routineSchema = mongoose.Schema({
    title: String,
    comments: [{
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Activity'
        }
    }]
});

var Routine = module.exports = mongoose.model('Routine', routineSchema);

//Get All
module.exports.getAll = function(callback){
  Routine.find(callback)
  .populate('comments.postedBy')
  .sort({_id: -1});
};

//Get by ID
module.exports.getById = function(id, callback){
  Routine.findById(id, callback)
  .populate('comments.postedBy');
};

// //Add Object
// module.exports.createObject = function(newObject, callback){
//   newObject.save(callback);
// };

//Add Object
module.exports.createObject = function(newObject, callback){
  //newObject.save(callback);
  newObject.save((error)=>{
    if(error){
      throw error;
    }
    Routine.find({})
    .populate('comments.postedBy')
    .exec(callback)
  });
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
      obj.nameRoutine = data.nameRoutine;

      obj.save(callback);
    }
  });
};
