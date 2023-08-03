const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const validator = Schema({
    Fecha: String,
    password: String,
});

module.exports = mongoose.model("validator", validator);