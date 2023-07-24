const Departamento = require('../models/departamentos');


function addDepto(req,res){
    var departamento = new Departamento();
    var params = req.body;

if(params.nombre){
    departamento.nombre = params.nombre;
    departamento.descripcion = params.descripcion;
    departamento.save((err, departamentoGuardado)=>{
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(!departamentoGuardado){
                res.status(200).send({message: 'No fue posible guardar el departamento'});
            }else{
                res.status(200).send({departamento: departamentoGuardado});
            }
        }
    });
}
}

module.exports = {
    addDepto
}