const express = require("express");
const cors = require("cors");
const app = express();

// IMPORTACION RUTAS
//const usuarioRoutes = require("./src/routes/usuario.routes");
const userRoutes = require("./src/routes/usuario.routes");
const departamento = require("./src/routes/departamento.routes");
const validator = require("./src/routes/validator.routes");

// MIDDLEWARES
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); 

// CABECERAS
app.use(cors());

// CARGA DE RUTAS localhost:3000/api/productos

app.use("/api", userRoutes, departamento, validator);

module.exports = app;

