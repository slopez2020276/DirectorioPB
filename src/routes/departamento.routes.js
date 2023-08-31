const express = require("express");
const controllersdepartamento = require("../controllers/departamento.controller");

const md_autenticacion = require("../middlewares/autenticacion");
const md_rol = require("../middlewares/roles");


const api = express.Router();


api.post('/resgistrarDepto', controllersdepartamento.addDepto),
api.put('/editarDepot/:idDeptos',controllersdepartamento.editarDepto),
api.get('/ObtenerDepto',controllersdepartamento.ObtenerDepto),
api.delete('/eliminarDepot/:idDeptos',controllersdepartamento.eliminarDepot)



module.exports = api;