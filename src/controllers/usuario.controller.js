const Usuario = require("../models/usuario.model");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt");
function RegistrarAd(req, res) {
  let usuarioModelo = new Usuario();

  usuarioModelo.nombre = "SuperAdmin";
  usuarioModelo.usuario = "SuperAdmin";
  usuarioModelo.email = "Superadmin";
  usuarioModelo.rol = "ADMINP";
  usuarioModelo.password = "12345";


  Usuario.find({
    $or: [{ usuario: usuarioModelo.usuario }],
  }).exec((err, buscarUsuario) => {
    if (err) return console.log("ERROR en la peticion");

    if (buscarUsuario && buscarUsuario.length >= 1) {
      console.log("Usuario Super Admin creado con anterioridad");
    } else {
      usuarioModelo.save((err, usuarioGuardado) => {
        if (err) return console.log("ERROR al crear el usuario Admin");

        if (usuarioGuardado) {
          console.log("Usuario Super Admin Creado");
        }
      });
    }
  });
}
function RegistrarPASSWORD(req, res) {
  let usuarioModelo = new Usuario();

  usuarioModelo.nombre = "USER";
  usuarioModelo.usuario = "USER";
  usuarioModelo.email = "USER";
  usuarioModelo.rol = "USUARIOP";
  usuarioModelo.password = "123456";


  Usuario.find({
    $or: [{ usuario: usuarioModelo.usuario }],
  }).exec((err, buscarUsuario) => {
    if (err) return console.log("ERROR en la peticion");

    if (buscarUsuario && buscarUsuario.length >= 1) {
      console.log("password del usuario  creada con anterioridad");
    } else {
      usuarioModelo.save((err, usuarioGuardado) => {
        if (err) return console.log("ERROR al crear el usuario Admin");

        if (usuarioGuardado) {
          console.log("Usuario password Creado");
        }
      });
    }
  });
}

function RegistrarUsuario(req, res) {
  var parametros = req.body;
  var usuarioModel = new Usuario();

  if (parametros.email && parametros.password && parametros.nombre 
    && parametros.apellido && parametros.pais) {
    usuarioModel.nombre = parametros.nombre;
    usuarioModel.email = parametros.email;
    usuarioModel.apellido = parametros.apellido;
    usuarioModel.puesto = parametros.puesto;
    usuarioModel.departamento = parametros.departamento;
    usuarioModel.celular_Corporativo = parametros.celular_Corporativo;
    usuarioModel.extencion = parametros.extencion
    usuarioModel.sucursal = parametros.sucursal
    usuarioModel.pais= parametros.pais
    usuarioModel.rol = 'USUARIO';

    Usuario.find({ email: parametros.email }, (err, usuarioEncontrado) => {
      if (usuarioEncontrado.length == 0) {
          usuarioModel.save((err, usuarioGuardado) => {
            if(err) return res.status(500).send({ mensaje:'error en la peticion 1'});
            else if(usuarioGuardado) {
              return res.status(200).send({ mensaje:'el usuario se creo correctamente',})
            }else{
              return res.send({ mensaje: 'error al guardar el usuario' })
            }
         })
       } else {
        return res
          .status(500)
          .send({ mensaje: "Este correo, ya  se encuentra utilizado" });
      }
    });
  } else {
    return res
      .status(500)
      .send({ mensaje: "Envie los parametros obligatorios" });
  }
}

function Logina(req, res) {
  var parametros = req.body;
  Usuario.findOne({ email: parametros.email }, (err, usuarioEncontrado) => {
    if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
    if (usuarioEncontrado) {
          if (usuarioEncontrado.password == parametros.password) {
            if (parametros.obtenerToken == "true") {
              return res
                .status(200)
                .send({ token: jwt.crearToken(usuarioEncontrado) });
            } else { 
              return res.status(200).send({ usuario: usuarioEncontrado });
            }
          }else {
            return res
              .status(500)
              .send({ mensaje: "Las contraseña no coincide" });
          }
        
      ;
    } else {
      return res
        .status(500)
        .send({ mensaje: "Error, el correo no se encuentra registrado." });
    }
  });
}



function Login(req,res){
  var parametros = req.body;
  var passwordBody = parametros.password;

  Validator.findOne({password: passwordBody}, (err, rolEncontrado)=>{
    if(err){
      res.status(500).send({mensaje: "Error en la peticion"});
    }else if(rolEncontrado){
      if(rolEncontrado.rol=='ADMINP'){
        Usuario.findOne({usuario:'SuperAdmin'},(err,usuarioEncontrado)=>{
          if(err){
            return res.status(200).send({mensaje: "Error en la peticion"});
          }else if (usuarioEncontrado){
            Usuario.findOne({email:'SuperAdmin'},(err,usuariofinded)=>{
              if(err){
                return res.status(500).send({mensaje: "Error en la peticion"});
              }else if(usuariofinded){
                if (parametros.obtenerToken == "true") {
                  return res.status(200).send({ token: jwt.crearToken(usuariofinded) });
                } else { 
                  return res.status(200).send({ usuario: usuariofinded });
                }
              }
            })
          }else if (rolEncontrado.rol=='USUARIO'){
            Usuario.findOne({email:'USUARIO'},(err,usuariofinded)=>{
              if(err){
                return res.status(500).send({mensaje: "Error en la peticion"});
              }else if(usuariofinded){
                if (parametros.obtenerToken == "true") {
                  return res
                    .status(200).send({ token: jwt.crearToken(usuariofinded) });
                } else { 
                  return res.status(200).send({ usuario: usuariofinded });
                }
              }
            })

          }
        })
      }else{

      }
            if (parametros.obtenerToken == "true") {
              return res
                .status(200)
                .send({ token: jwt.crearToken(rolEncontrado) });
            } else {
              return res.status(200).send({ usuario: rolEncontrado });
            }
    }else{
      return res.status(200).send({mesaje: 'Ingrese la contraseña correcta '})


    }
  })
}


function crearGerente(req, res) {
  let parametros = req.body;
  let usuarioModel = new Usuario();

  if (parametros.nombre && parametros.email) {
    Usuario.find({ email: parametros.email }, (err, gerenteEncontrado) => {
      if (gerenteEncontrado.length > 0) {
        return res
          .status(500)
          .send({ message: "Este correo esta en uso por otro administrador" });
      } else {
        usuarioModel.nombre = parametros.nombre;
        usuarioModel.email = parametros.email;
        usuarioModel.rol = "Gerente";
        bcrypt.hash(
          parametros.password,
          null,
          null,
          (err, passwordEncriptada) => {
            usuarioModel.password = passwordEncriptada;

            usuarioModel.save((err, gerenteGuardado) => {
              if (err)
                return res
                  .status(500)
                  .send({ mensaje: "Error en la peticion" });
              if (!gerenteGuardado)
                return res
                  .status(500)
                  .send({ mensaje: "Error al guardar el gerente" });
              return res.status(200).send({ gerente: "gerenteGuardado" });
            });
          }
        );
      }
    });
  } else {
    return res
      .status(404)
      .send({ mensaje: "Debe ingresar los parametros obligatorios" });
  }
}

function EditarUsuario(req, res) {
  var idUser = req.params.idUser;
  var parametros = req.body;

  Usuario.findOne({ idUser: idUser }, (err, usuarioEncontrado) => {
    if(usuarioEncontrado){
          Usuario.findByIdAndUpdate(idUser,parametros,{ new: true },
            (err, usuarioActualizado) => {
          if (err)
            return res
              .status(500)
              .send({ mensaje: "Error en la peticon de editar" });
          if (!usuarioActualizado)
            return res.status(500).send({ mensaje: "Error al editar usuario" });
          return res.status(200).send({ usuario: usuarioActualizado });
        }
      );
      Usuario.findByIdAndUpdate(
        idUser,
        {
          $set: {
            nombre: parametros.nombre,
          },
        },
        { new: true },
        (err, usuarioActualizado) => {
          if (err)
            return res.status(500).send({ mensaje: "Error en la peticion" });
          if (!usuarioActualizado)
            return res
              .status(500)
              .send({ mensaje: "Error al editar el Usuario" });
  
          return res.status(200).send({ usuario: usuarioActualizado });
        }
      );
    }else{
      return res.status(500).send({mensaje:'error al encontrar el usuario'});
    }
    
  });
}

function EditarUsuarios(req, res){
  let userId = req.params.id;
  let update = req.body;

      Usuario.findById(userId, (err, userFind)=>{
          if(err){
              return res.status(500).send({ message: 'Error general'});
          }else if(userFind){
              Usuario.findOne({email: update.email},(err,userFinded)=>{
                  if(err){
                      return res.status(500).send({message: "Error al buscar nombre de usuario"});
                  }else if(userFinded){
                      if(userFinded.email == update.email){
                          Usuario.findByIdAndUpdate(userId, update, {new: true}, (err, userUpdated)=>{
                              if(err){
                                  return res.status(500).send({message: 'Error general al actualizar'});
                              }else if(userUpdated){
                                  return res.send({message: 'Usuario actualizado', userUpdated});
                              }else{
                                  return res.send({message: 'No se pudo actualizar la empresa'});
                              }
                          })
                      }else{
                          return res.send({message: "Nombre de usuario ya en uso"});
                      }
                  }else{
                      Usuario.findByIdAndUpdate(userId, update, {new: true}, (err, userUpdated)=>{
                          if(err){
                              return res.status(500).send({message: 'Error general al actualizar'});
                          }else if(userUpdated){
                              return res.send({message: 'Usuario actualizada', userUpdated});
                          }else{
                              return res.send({message: 'No se pudo actualizar la empresa'});
                          }
                      })
                  }
              })
          }else{
              return res.send({message: "Empresa inexistente"});
          }
      })
  }


function EditarReal(req,res){
  params = req.body;
  idUser = req.params.idUsuario

  Usuario.findById(idUser,(err,userEncontrado) => {
    if (err){
      return res.status(500).send({message:'error en la peticion'})
    }else if (userEncontrado){
      let emailP = params.email
      Usuario.findOne({email:emailP},(err,userEncontrado) => {
        if(err){
          return res.status(500).send({message:'error en la petion 2 '})
        }else if (!userEncontrado){
            Usuario.findByIdAndUpdate(idUser,params(err,))
        }else{
          return res.status(500).send({message:'el correo ya se encuentra en uso'})
        }
      })
    }else{
      return res.status(500).send({message:'no se encontro el usuario'});
    }
  })
}



function ObtenerUsuario(req, res) {
  Usuario.find({}, (err, usuarioEncontrado) => {
    return res.status(200).send({ usuario: usuarioEncontrado });
  });
}

function ObtenerUsuarioId(req, res) {
  var idUsuario = req.params.idUsuario;

  Usuario.findById(idUsuario, (err, usuarioEncontrado) => {
    if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
    if (!usuarioEncontrado)
      return res.status(500).send({ mensaje: "Error al obtener Usuario" });

    return res.status(200).send({ usuario: usuarioEncontrado });
  });
}

function eliminarUsuario(req, res) {
  var idUsuario = req.params.idUsuario;

  Usuario.findById(idUsuario, (err, userFinded) => {
    if (err) {
      return res.status(500).send({ mensaje: "error en la peticion 1" });
    } else if (userFinded) {
      Usuario.findByIdAndDelete(idUsuario, (err, userRemoved) => {
        if (err) {
          return res.status(500).send({ mensaje: "error en petcion 2" });
        } else if (userRemoved) {
          return res
            .status(200)
            .send({ mensaje: "Usuario eliminado con exito", userRemoved });
        }
      });
    } else {
      return res.status(500).send({ mensaje: "error al eliminar Usuario" });
    }
  });
}

function ObtenerUsuarios(req,res){
  Usuario.find({rol:'USUARIO'}, (err,usuariosEncontrados)=>{
    if(err){return res.status(500).send('error en la peticion 1');
    }else if(usuariosEncontrados){
      return res.status(200).send({usuario:usuariosEncontrados});

    }else{
      return res.send({ mensaje: 'error al obtener usuarios'})
    }
  })
}


function ObterneruserLog(req,res){
  var user = req.user.sub;
   Usuario.findById(user,(err,usuarioEncontrado)=>{
    if(err){
      return res.status(500).send({ mensaje:'error en la peticion'})
    }else if (usuarioEncontrado){
          return res.status(200).send({usario:usuarioEncontrado})
    }else{
      return res.send({ mensaje: 'error al obtener '})
    }
   })
}

function CrearGerente(req,res ){
 var parametros = req.body;
 
  if (parametros.rol == 'Gerente'){
     if (parametros.nombre && parametros.email) {
    Usuario.find({ email: parametros.email }, (err, gerenteEncontrado) => {
      if (gerenteEncontrado.length > 0) {
        return res
          .status(500)
          .send({ message: "Este correo esta en uso por otro administrador" });
      } else {
        usuarioModel.nombre = parametros.nombre;
        usuarioModel.email = parametros.email;
        usuarioModel.rol = "Gerente";
        bcrypt.hash(
          parametros.password,
          null,
          null,
          (err, passwordEncriptada) => {
            usuarioModel.password = passwordEncriptada;

            usuarioModel.save((err, gerenteGuardado) => {
              if (err)
                return res
                  .status(500)
                  .send({ mensaje: "Error en la peticion" });
              if (!gerenteGuardado)
                return res
                  .status(500)
                  .send({ mensaje: "Error al guardar el gerente" });
              return res.status(200).send({ gerente: "gerenteGuardado" });
            });
          }
        );
      }
    });
  } else {
    return res
      .status(404)
      .send({ mensaje: "Debe ingresar los parametros obligatorios" });
  }
  }else if(parametros.rol==''){

  }else if(parametros.rol==''){

  }else if(parametros.rol==''){

  }
  
}

function ValidarUsuario(req,res){
  var parametros = req.body;
 
    

}

function Editarpassword(req,res){
  var idUser = req.params.idUser;
  var params = req.body;
  var password = params.password;
  var passwordNueva = params.passwordNueva;

  Usuario.findOne({rol:'ADMIN'},(err,usuarioEncontrado)=>{
    if(err){
      return res.status(500).send({mensaje:'error en la peticion 1'});
    }else if(usuarioEncontrado){
      bcrypt.compare(password,usuarioEncontrado.password,(err,passwordOk)=>{
        if(passwordOk){
          bcrypt.hash(passwordNueva,null,null,(err,passEncriptada)=>{
            Usuario.findByIdAndUpdate(idUser,{password:passEncriptada},{new:true},(err,usuarioActualizado)=>{
              if(err){
                return res.status(500).send({mensaje:'error en la peticion 2'});
              }else if(usuarioActualizado){
                return res.status(200).send({usuario:usuarioActualizado});
              }else{
                return res.status(500).send({mensaje:'no se pudo actualizar el usuario'});
              }
            })
          })
        }else{
          return res.status(500).send({mensaje:'la contraseña no coincide'});
        }
      })
    }else{
      return res.status(500).send({mensaje:'no se encontro el usuario'});
    }
  })  
}


module.exports = {
  RegistrarAd,
  Login,
  RegistrarUsuario,
  EditarUsuario,
  ObtenerUsuario,
  ObtenerUsuarioId,
  eliminarUsuario,
  crearGerente,
  ObtenerUsuarios,
  ObterneruserLog,
  EditarUsuarios,
  Editarpassword,
  RegistrarPASSWORD
};
