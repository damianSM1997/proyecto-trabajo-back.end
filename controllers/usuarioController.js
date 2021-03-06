const Usuario = require("../models/Usuario");
const Items = require('../models/Items');

const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async(req, res) => {
    //let SECRETA = 'palabrasecreta';
    //revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    }

    const { email, password } = req.body;



    try {

        //validar que el usuario registrado sea unico
        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res.status(400).json({ msg: 'Ya existe este usuario' })
        }

        //crea nuevo usuario
        usuario = new Usuario(req.body);

        //Hasheando el password
        /**Salt se encargara de que el hash sea unico */
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);

        //guardar el nuevo usuario
        await usuario.save();

        //crear y firmar el jwt
        const payload = {
            usuario: {
                id: usuario.id
            }
        };

        //firmar el jwt
        jwt.sign(payload, process.env.SECRETA, {
            //jwt.sign(payload, SECRETA, {
            expiresIn: 360000 //1 hora expira
        }, (error, token) => {
            if (error) throw error;

            //mensaje de confirmacion
            res.json({ token })
        });





    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}