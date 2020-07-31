const express = require('express');
const router = express.Router();
const comprasController = require('../controllers/comprasController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');

router.post('/:id',
    auth,
    [   
        //estas son las validaciones de ser requerido aqui se puede apliar
        check('tipoPago', 'El tipoPago para la carta es obligatorio').not().isEmpty(),
        
    ],
    comprasController.crearCompra
);

router.get('/',
    auth,
    comprasController.obtenerCompras
)

router.get('/ventas',
    auth,
    comprasController.obtenerVentas
)

module.exports = router;