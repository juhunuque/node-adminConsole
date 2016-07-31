var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  nombre:{
    type: String,
    required: true,
    default: ""
  },
  apellidos:{
    type: String
  },
  correo:{
    type: String,
    required: true,
    default: ""
  },
  fechaNacimiento:{
    type: Date
  },
  genero:{
    type: String
  },
  foto:{
    type: String
  },
  rutinas:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Routine"
  }]
});

var User = module.exports = mongoose.model('User', userSchema);

//Get All
module.exports.getAll = function(callback){
  User.find(callback)
  .populate({
    path: 'rutinas',
    populate:{
      path: 'actividades'
    }
  })
};

//Get by ID
module.exports.getById = function(id, callback){
  User.findById(id, callback)
  .populate({
    path: 'rutinas',
    populate:{
      path: 'actividades'
    }
  });
};

//Get by Email
module.exports.getByEmail = function(email, callback){
  User.findOne({correo: email}, callback)
  .populate({
    path: 'rutinas',
    populate:{
      path: 'actividades'
    }
  });
};

// //Add Object
module.exports.createObject = function(newObject, next, callback){
  newObject.save((error, newObj)=>{
    //if(error){return error;}
    if(error){
      return next(new Error(error))
    }

    User.findById(newObj.id, callback)
    .populate({
      path: 'rutinas',
      populate:{
        path: 'actividades'
      }
    });
  });
};

//Remove Object
module.exports.removeObject = function(id, callback){
  User.find({_id: id}).remove(callback);
};

//Update Object
module.exports.updateObject = function(id, data, next, callback){
  User.findById(id, function(err, obj){
    if(!obj){
      return next(new Error("Could not load User to update"))
    }else{
      obj.nombre = data.nombre;
      obj.apellidos = data.apellidos;
      obj.correo = data.correo;
      obj.fechaNacimiento = data.fechaNacimiento;
      obj.genero = data.genero;
      obj.foto = data.foto;
      obj.rutinas = data.rutinas;

      obj.save((error, newObj)=>{
        if(error){return next(err);}

        User.findById(newObj.id, callback)
        .populate({
          path: 'rutinas',
          populate:{
            path: 'actividades'
          }
        });
      });
    }
  });
};
