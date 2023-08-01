const express = require("express");
const cors = require("cors");
const app = express();

// IMPORTACION RUTAS
//const usuarioRoutes = require("./src/routes/usuario.routes");
const userRoutes = require("./src/routes/usuario.routes");
const departamento = require("./src/routes/departamento.routes");


// MIDDLEWARES
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); 

const corsOptions = {
    origin: '',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  };
// CABECERAS
app.use(cors(corsOptions));

// CARGA DE RUTAS localhost:3000/api/productos

app.use("/api", userRoutes, departamento);

module.exports = app;

