const Items = require('../models/Items');
const { validationResult } = require('express-validator');
const { json } = require('express');
const fs = require('fs-extra');
const path = require('path');
const { randomNombreImg } = require('../helpers/libs')



exports.crearItem = async(req, res) => {

    //revisar si hay errores en el caso de dejar algun campo vasio
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    }

    try {

        //crear un nuevo item
        const items = new Items(req.body);
        //guardar el creador via jwt
        items.creador = req.usuario.id;
        //genera un nombre aleatorio de 6 
        const imgUrl = randomNombreImg();
        console.log(imgUrl)

        const salvarImagen = async() => {
            //ruta temporal de la imagen
            const imgUrl = randomNombreImg();
            //por si existe una imagen igual
            const images = await Items.find({ img: imgUrl });

            if (images.length > 0) {
                //se aplica recurcion para el caso de que un nombre sea repetido
                salvarImagen();
            } else {
                const imagenTempPath = req.file.path;
                //extrae el objeto y solo se requiere la extencion
                const ext = path.extname(req.file.originalname).toLocaleLowerCase();

                //ruta para la imagen
                const rutaIMG = path.resolve(`public/upload/${imgUrl}${ext}`);

                if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
                    await fs.rename(imagenTempPath, rutaIMG);
                    items.img = "public/upload/" + imgUrl + ext;

                    //guardamos item
                    items.save();
                    res.json(items);

                    //res.json(req.file) 
                } else {
                    await fs.unlink(imagenTempPath);
                    res.status(500).json({ error: 'Error solo imagenes son permitidas' });
                }
            };
        }
        salvarImagen();


    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error, la imagen es obligatoria');
    }
}



//parte para actualizar una carta a partir del id de la carta
exports.actualizarItem = async(req, res) => {
    const items = new Items(req.body);

    //revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    }

    //extraer la informacion del item
    const { titulo, precio, descripcion, tipo, disponibles, img } = req.body;
    //!titulo || !precio || !descripcion || !tipo || !disponibles
    const nuevoItem = {};

    // de existir alguno de los siguientes campos --> entonces asigar al nuevo areglo

    if (titulo) nuevoItem.titulo = titulo;
    if (precio) nuevoItem.precio = precio;
    if (descripcion) nuevoItem.descripcion = descripcion;
    if (tipo) nuevoItem.tipo = tipo;
    if (disponibles) nuevoItem.disponibles = disponibles;
    //if(img) nuevoItem.img = img;  

    function imgNueva() {

        //crear un nuevo item
        const items = new Items(req.body);
        //guardar el creador via jwt
        items.creador = req.usuario.id;
        const imgUrl = randomNombreImg();
        const ext = path.extname(req.file.originalname).toLocaleLowerCase();
        const salvarImagen = async() => {
            //ruta temporal de la imagen

            //por si existe una imagen igual
            const images = await Items.find({ img: imgUrl });
            if (images.length > 0) {
                //se aplica recurcion para el caso de que un nombre sea repetido
                salvarImagen();
            } else {
                const imagenTempPath = req.file.path;
                //extrae el objeto y solo se requiere la extencion


                //ruta para la imagen
                const rutaIMG = path.resolve(`public/upload/${imgUrl}${ext}`);

                if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
                    await fs.rename(imagenTempPath, rutaIMG);

                } else {
                    await fs.unlink(imagenTempPath);
                    res.status(500).json({ error: 'Error solo imagenes son permitidas' });
                }
            };
        }
        salvarImagen();
        return nuevoItem.img = "public/upload/" + imgUrl + ext
    }
    let extURL = imgNueva()



    if (img) {
        nuevoItem.img = extURL

    }

    try {
        //revisar el ID        
        let item = await Items.findById(req.params.id);

        //Si el item existe
        if (!item) {
            return res.status(404).json({ msg: 'Carta no encontrado' })
        }
        //verificar el creador del item
        if (item.creador.toString() !== req.usuario.id) {
            return res.status(404).json({ msg: 'No autorizado' })
        }
        //actualizar
        item = await Items.findOneAndUpdate({ _id: req.params.id }, { $set: nuevoItem }, { new: true });
        res.json({ item });

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}







//eliminar item
exports.eliminaritem = async(req, res) => {
    try {
        //revisar el ID
        let item = await Items.findById(req.params.id);

        //Si la carta  existe
        if (!item) {
            return res.status(404).json({ msg: 'Carta no encontrado' })
        }
        //verificar el creador de la carta
        if (item.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: 'No autorizado' })
        }

        //Eliminar la carta
        //aqui se puede agregar una validacion para el caso de que disponibles
        //sea igual a 0
        await Items.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Carta eliminado' });

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor')
    }
}

// en lo personal me agrada mas la otra forma para subir la imagen de la carte pero
// pueden sentirse libres de poder ocupar el metodo que mas les guste o se acomo
// mejor a lo que requieran, para ocupar estas formas solo es nesesario cambiar el
// nombre de los metodos correspondientes en la siguiente rura 
// routes/items.js

//parte para crear carta (base64)
exports.crearItem2 = async(req, res) => {

    //revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    }
    try {
        //crear un nuevo item
        const items = new Items(req.body);
        //guardar el creador via jwt
        items.creador = req.usuario.id;
        // para este punto obvio tiene que haber algo pues desde la primara parte
        // revisa si hay algo vasio o no cumple con los requicitos pero agrego un arror por si las dudas        
        if (req.body.img != "") {

            let imagen = req.body.img;
            let fs = require('fs');
            //nombre random con la extencion .png asignado a "nombreArchivo"
            let nombreArchivo = Math.random().toString() + ".png";

            //la direccion a la cual se va a guardar -- nombre del archivo -- la imagen en cuistion en base64
            fs.writeFile("public/upload/" + nombreArchivo, imagen, "base64", (error) => {
                if (error) {
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

//parte para actualizar una carta a partir del id de la carta (base64)
exports.actualizarItem2 = async(req, res) => {
    const items = new Items(req.body);

    //revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    }

    //extraer la informacion del item
    const { titulo, precio, descripcion, tipo, disponibles, img } = req.body;
    //!titulo || !precio || !descripcion || !tipo || !disponibles
    const nuevoItem = {};

    // de existir alguno de los siguientes campos --> entonces asigar al nuevo areglo

    if (titulo) nuevoItem.titulo = titulo;
    if (precio) nuevoItem.precio = precio;
    if (descripcion) nuevoItem.descripcion = descripcion;
    if (tipo) nuevoItem.tipo = tipo;
    if (disponibles) nuevoItem.disponibles = disponibles;
    //if(img) nuevoItem.img = img;  

    function imgNueva(img) {
        //ruta a la que se direccionara
        let ruta = "public/upload/";
        let imagen = req.body.img;
        let fs = require('fs');
        let nombreArchivo = Math.random().toString() + ".png";
        //nombre random con la extencion .png asignado a "nombreArchivo"            
        //la direccion a la cual se va a guardar -- nombre del archivo -- la imagen en cuistion en base64
        fs.writeFile(ruta + nombreArchivo, imagen, "base64", (error) => {
            if (error) {
                //por si llega un error
                return res.status(404).send('Hubo un error, no hay ninguna imagen disponible')
            }
        })
        return ruta + nombreArchivo;
    }


    if (img) {
        //nuevoItem.img = "public/upload/" + nombreArchivo;
        nuevoItem.img = imgNueva(img);
    }




    try {
        //revisar el ID        
        let item = await Items.findById(req.params.id);

        //Si el item existe
        if (!item) {
            return res.status(404).json({ msg: 'Carta no encontrado' })
        }
        //verificar el creador del item
        if (item.creador.toString() !== req.usuario.id) {
            return res.status(404).json({ msg: 'No autorizado' })
        }
        //actualizar
        item = await Items.findOneAndUpdate({ _id: req.params.id }, { $set: nuevoItem }, { new: true });
        res.json({ item });

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}