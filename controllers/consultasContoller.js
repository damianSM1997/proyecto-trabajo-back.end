const Items = require('../models/Items');
const {validationResult} = require('express-validator');
const { json } = require('express');

//Obtiene todos las cartas del usuario actual
exports.obtenerItems = async (req,res) => {
    try {
        // console.log(req.usuario);        
        const items = await Items.find({creador: req.usuario.id}).sort({creado: -1});
        res.json({items});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//usuario busca una carta de otro usuario
exports.obtenerItemsOtrosUsuarios = async (req,res) => {
    try {
         //console.log(req.usuario); 
         //console.log(req.params.id)       
        let item = await Items.findById(req.params.id);
        const items = await Items.find({creador: req.params.id}).sort({creado: -1});
        res.json({items})
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


exports.obtenerItemsEspecifico  = async (req,res) => {
    try {
        //  console.log(req.body)
        //  console.log(req.body)
        //  console.log(req.usuario); 
        //  console.log(req.params.id)       
        let item = await Items.findById(req.params.id);
        //const items = await Items.find({_id: req.params.id}).sort({creado: -1});
        res.json({item})
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error tarjeta no encontrada');
    }
}



exports.obtenerPorTipo = async (req,res) => {    
    console.log(req.body)            
    try {
         console.log(req.usuario);
        const items = await Items.find(req.body).sort({creado: -1});
        res.json({items});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
