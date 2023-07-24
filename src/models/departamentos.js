const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const departamento = Schema({
    nombre: String,
    descripcion: String,
});

module.exports = mongoose.model("departamento", departamento);