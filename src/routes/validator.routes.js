
const express = require('express');
const controladorVali = require('../controllers/Validator');


const api = express.Router();


api.post('/validarPassword' ,controladorVali.Validarpassword);
api.put('/editarPassword' ,controladorVali.editarPassword);

module.exports = api;