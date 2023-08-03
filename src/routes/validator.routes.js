
const express = require('express');
const controladorVali = require('../controllers/Validator');


const api = express.Router();


api.post('/editarPassword' ,controladorVali.Validarpassword);

module.exports = api;