const express = require('express');
const router = express.Router();
const consultasController = require('../controllers/consultasContoller');
const auth = require('../middleware/auth');
//const {check} = require('express-validator');

///obtiene sus tarjetas (inventario)
router.get('/',
    auth,
    consultasController.obtenerItems
)

// partepara los items de otros usuarios
router.get('/:id',
    auth,
    consultasController.obtenerItemsOtrosUsuarios
)

router.get('/especifico/:id',
    auth,
    consultasController.obtenerItemsEspecifico
)


module.exports = router;