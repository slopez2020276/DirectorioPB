const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const validator = Schema({
    rol: String,
    password: String,
});

module.exports = mongoose.model("validator", validator);