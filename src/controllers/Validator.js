const Usuario = require("../models/usuario.model");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt");
Validator = require("../models/validator.model");

function crearPassworddef(req,res){
  Validator.findOne({rol:'ADMINP'},(err, buscarUsuario) => {
    if (err) return console.log("ERROR en la peticion");

    if (buscarUsuario) {
     return console.log("password creada con atnerioridad");
    } else {
      var valiModel =new Validator();
      valiModel.password = '12345';
      valiModel.rol = 'ADMINP'
      valiModel.save((err, validatorGuardado)=>{
        if(err){
          return console.log(err);
        }else if (validatorGuardado){
          return console.log('se creo la password por defecto');
        }else{
          return console.log('no creo la password ')
        }
      })
    }
  });
}  
function crearPassworUser(req,res){
  Validator.findOne({rol:'USUARIO'},(err, buscarUsuario) => {
    if (err) return console.log("ERROR en la peticion");

    if (buscarUsuario) {
     return console.log("password creada con atnerioridad");
    } else {
      var valiModel =new Validator();
      valiModel.password = '123456';
      valiModel.rol = 'USUARIO'
      valiModel.save((err, validatorGuardado)=>{
        if(err){
          return console.log(err);
        }else if (validatorGuardado){
          return console.log('se creo la password por defecto');
        }else{
          return console.log('no creo la password ')
        }
      })
    }
  });
}  
 function Validarpassword(req,res){
  var parametros = req.body;
  Validator.findOne({},(err,passwordEncontrado)=>{
      if(err){
        return res.status(500).send({mensaje:'Error en la peticion'});
      }else if (passwordEncontrado){
        
            if (passwordEncontrado.password==parametros.password ) {
              if (parametros.obtenerToken == "true") {
                return res
                  .status(200)
                  .send({ token: jwt.crearToken(passwordEncontrado) });
              } else {
                passwordEncontrado.password = undefined;
                return res.status(200).send({ usuario: passwordEncontrado });
              }
            }else {
              return res
                .status(500)
                .send({ mensaje: "Las contraseña no coincide" });
            }
          
        
      }
    })
 }


function tieneCaracteresEspeciales(str) {
  const caracteresEspeciales = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  return caracteresEspeciales.test(str);
}

function tieneNumeros(str) {
  const numeros = /[0-9]+/;
  return numeros.test(str);
}

function editarPassword(req, res) {
  const newPassword = req.body.password; // Supongo que recibes la nueva contraseña en req.body

  // Validación de longitud mínima de contraseña
  if (newPassword.length < 8) {
    return res.status(400).send({ mensaje: 'La contraseña debe tener al menos 8 caracteres' });
  }

  // Validación de caracteres especiales
  if (!tieneCaracteresEspeciales(newPassword)) {
    return res.status(400).send({ mensaje: 'La contraseña debe contener al menos un carácter especial' });
  }

  // Validación de números
  if (!tieneNumeros(newPassword)) {
    return res.status(400).send({ mensaje: 'La contraseña debe contener al menos un número' });
  }

  // Encuentra el registro del Validator con el rol 'USUARIO'
  Validator.findOne({ rol: 'USUARIO' }, (err, passwordEncontrado) => {
    if (err) {
      return res.status(500).send({ mensaje: 'Error en la petición' });
    } else if (passwordEncontrado) {
      const idpassword = passwordEncontrado._id;
      const update = { password: newPassword }; // Actualiza el campo password con la nueva contraseña sin encriptar

      Validator.findByIdAndUpdate(idpassword, update, { new: true }, (updateErr, passwordUpdate) => {
        if (updateErr) {
          return res.status(500).send({ mensaje: 'Error en la petición' });
        } else if (passwordUpdate) {
          return res.status(200).send({ mensaje: 'Se actualizó la contraseña' });
        } else {
          return res.status(500).send({ mensaje: 'No se actualizó la contraseña' });
        }
      });
    }
  });
}
 

  module.exports = {
    crearPassworddef,
    Validarpassword,
    editarPassword,
    crearPassworUser
  }
  