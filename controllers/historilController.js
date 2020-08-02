const Compras = require('../models/Compras');
const Items = require('../models/Items');
const {validationResult} = require('express-validator');
const { json } = require('express');

//obtener compras realisadas por un usuario
exports.obtenerCompras = async (req,res) => {
    
    try {
        // console.log(req.usuario);        
        const compras = await Compras.find({comprador: req.usuario.id}).sort({fecha: -1});
        res.json({compras});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


exports.obtenerVentas = async (req,res) => {
    let item = await Items.findById(req.params.id);
    //console.log(item)
    try {        
        // console.log(req.usuario);        
        const ventas = await Compras.find({IDvendedor: req.usuario.id}).sort({fecha: -1});
        res.json({ventas});        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}







