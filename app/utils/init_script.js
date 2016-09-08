var User = require('./../models/user.model');
var config = require('./../config/internalConfigs').defaultAdmin;

const newObject = new User({
  nombre: config.name,
  apellidos: config.lastname,
  correo: config.email,
  password: config.password,
  tipo: config.type
});

// Check if the user already exists
User.getByEmail(newObject.correo,(err, object)=>{
  if(!object){
    // If the user does not exist, create a new one
    User.createObject(newObject, null, (err, object)=>{
      console.log("Admin user created");
    });
  }
});
