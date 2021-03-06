const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

router.post('/',
    auth, [
        //estas son las validaciones de ser requerido aqui se puede apliar
        check('titulo', 'El titulo de la carta es obligatorio').not().isEmpty(),
        check('precio', 'El precio de la carta es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripcion de la carta es obligatorio').not().isEmpty(),
        check('tipo', 'El tipo de la carta es obligatorio').not().isEmpty(),
        check('disponibles', 'El numero de disponibles de la carta es obligatorio').not().isEmpty(),
        check('img', 'La imagen de la carta es obligatorio').not().isEmail()
    ],
    itemsController.crearItem
);

router.put('/:id',
    auth,
    itemsController.actualizarItem
)

router.delete('/:id',
    auth,
    itemsController.eliminaritem
)

module.exports = router;