require('dotenv').config();
//console.log(process.env)

const mongoose = require("mongoose");
const app = require("./app");
const usuarioController = require("./src/controllers/usuario.controller");
const validatorConntroller = require('./src/controllers/Validator')



mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false); 
mongoose.connect('mongodb+srv://des:des@cluster0.hpgumvw.mongodb.net/?retryWrites=true&w=majority' , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Se ha conectado correctamente a la base de datos.");

    usuarioController.RegistrarAd();
    validatorConntroller.crearPassworddef();
      const PORT = process.env.PORT || 3000
    app.listen(PORT, function () {
      console.log(
        'El servidor está levantado en el puerto '+PORT 
      );
    });
  })
  .catch((error) => console.log(error));
