const Usuario = require("../models/usuario.model");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt");
const Validator = require("../models/Validator.model");

function crearPassworddef(req,res){
  Validator.find((err, buscarUsuario) => {
    if (err) return console.log("ERROR en la peticion");

    if (buscarUsuario.length >= 1) {
     return console.log("password creada con atnerioridad");
    } else {
      var valiModel =new Validator();
      valiModel.password = '12345';
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
 

  module.exports = {
    crearPassworddef,
    Validarpassword
  }
  