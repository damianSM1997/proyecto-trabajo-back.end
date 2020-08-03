const Items = require('../models/Items');
const {validationResult} = require('express-validator');
const { json } = require('express');

exports.crearItem = async (req,res) => {

    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array()})
    }
    try {
        //crear un nuevo item
        const items = new Items(req.body);        
        //guardar el creador via jwt
        items.creador = req.usuario.id;
        // para este punto obvio tiene que haber algo pues desde la primara parte
        // revisa si hay algo vasio o no cumple con los requicitos pero agrego un arror por si las dudas        
        if(req.body.img!= ""){
            
            let imagen  = req.body.img;
            let fs = require('fs');
            //nombre random con la extencion .png asignado a "nombreArchivo"
            let nombreArchivo = Math.random().toString()+".png";

            //la direccion a la cual se va a guardar -- nombre del archivo -- la imagen en cuistion en base64
            fs.writeFile("public/upload/" + nombreArchivo, imagen, "base64", (error) => {
                if(error){
                    //por si llega un error
                    return res.status(404).send('Hubo un error, no hay ninguna imagen disponible')
                }
                items.img = "public/upload/" + nombreArchivo;
                //guardamos item
                items.save();
                res.json(items);
            })
        }        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


//parte para actualizar una carta a partir del id de la carta
exports.actualizarItem = async (req,res) => {
    const items = new Items(req.body); 
    
    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array()})
    }

    //extraer la informacion del item
    const {titulo, precio, descripcion, tipo, disponibles, img} = req.body;
    //!titulo || !precio || !descripcion || !tipo || !disponibles
    const nuevoItem = {};            

    // de existir alguno de los siguientes campos --> entonces asigar al nuevo areglo
    
    if(titulo) nuevoItem.titulo = titulo;    
    if(precio) nuevoItem.precio = precio;    
    if(descripcion) nuevoItem.descripcion = descripcion;    
    if(tipo) nuevoItem.tipo = tipo;    
    if(disponibles) nuevoItem.disponibles = disponibles; 
    //if(img) nuevoItem.img = img;  
        
    function imgNueva (img){        
        //ruta a la que se direccionara
        let ruta = "public/upload/";                
        let imagen  = req.body.img;
        let fs = require('fs');
        let nombreArchivo = Math.random().toString()+".png";
        //nombre random con la extencion .png asignado a "nombreArchivo"            
        //la direccion a la cual se va a guardar -- nombre del archivo -- la imagen en cuistion en base64
        fs.writeFile( ruta + nombreArchivo, imagen, "base64", (error) => {
            if(error){
                //por si llega un error
                return res.status(404).send('Hubo un error, no hay ninguna imagen disponible')
            }                                                                                                                                                                                   
        })
        return ruta + nombreArchivo;
    }
    
    
    if(img) {
        //nuevoItem.img = "public/upload/" + nombreArchivo;
        nuevoItem.img = imgNueva(img);
    }
    

    

    try {
        //revisar el ID        
        let item = await Items.findById(req.params.id);

        //Si el item existe
        if(!item) {
            return res.status(404).json({msg: 'Carta no encontrado'})            
        }
        //verificar el creador del item
        if(item.creador.toString() !== req.usuario.id) {
            return res.status(404).json({msg: 'No autorizado'})
        }
        //actualizar
        item = await Items.findOneAndUpdate({_id: req.params.id}, {$set: nuevoItem}, {new: true});
        res.json({item});

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}

//eliminar item
exports.eliminaritem = async (req,res) => {
    try {
        //revisar el ID
        let item = await Items.findById(req.params.id);

        //Si la carta  existe
        if(!item) {
            return res.status(404).json({msg: 'Carta no encontrado'})
        }
        //verificar el creador de la carta
        if(item.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'No autorizado'})
        }

        //Eliminar la carta
        //aqui se puede agregar una validacion para el caso de que disponibles
        //sea igual a 0
        await Items.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'Carta eliminado'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor')
    }    
}





