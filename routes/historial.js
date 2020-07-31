const express = require('express');
const router = express.Router();
const historilController = require('../controllers/historilController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');


router.get('/compras',
    auth,
    historilController.obtenerCompras
)

router.get('/ventas',
    auth,
    historilController.obtenerVentas
)

module.exports = router;