const Compras = require('../models/Compras');
const Items = require('../models/Items');
const {validationResult} = require('express-validator');
const { json } = require('express');

exports.crearCompra = async (req,res) => {

    
    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array()})
    }
    try {

        
        let item = await Items.findById(req.params.id);
        //En este punto de existir la compra la variable item a partir de req.params.id se puede
        //acceder a su info de lo cual a partir de esta se asignara despues a nuestro modelo de compras
        //

        console.log(item)
        //crear una nueva compra
        const compras = new Compras(req.body);
        
        compras.comprador = req.usuario.id;
        compras.carta = item.titulo;
        compras.precio = item.precio;
        compras.IDcarta = item._id;
        compras.IDvendedor = item.creador;
        
        
        //guardamos proyecto
        compras.save();
        res.json(compras);
        
    } catch (error) {
        //console.log(error);
        res.status(500).send('Hubo un error');
    }
}







