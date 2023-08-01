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

function editarDepto(req,res){
    var iddatp = req.params.idDeptos;
    var update = req.body;
    Departamento.findByIdAndUpdate(iddatp,update,{new:true},(err,deptoUpdate)=>{
        if(err){
            return res.status(500).send({mesaje:'error en la petiocn'})
        }else if (deptoUpdate){
            return res.status(200).send({mesaje:'departamento Editado',departamentos:deptoUpdate})
        }else{
            return res.status(500).send({mesaje:'error al editar el departamento'})
        }
    })
    
}
function eliminarDepot(req,res){
    var idDepto = req.params.idDeptos;
    Departamento.findByIdAndDelete(idDepto,{new:true},(err,deptoUpdate)=>{
        if(err){
            return res.status(500).send({mensaje:'error en la peticion'})
        }else if (deptoUpdate){
            return res.status(200).send({mensaje:''})
        }else{

        }
    })
}
module.exports = {
    addDepto,
    editarDepto,

}