const mongoose = require('mongoose');

const ComprasSchema = mongoose.Schema({    
    comprador:{
        type: mongoose.Schema.Types.ObjectId,        
        ref: 'Usuario'
    },
    carta:{
        type: String
    },
    IDcarta:{
        type: String
    },
    IDvendedor:{
        type: String
    },
    total:{
        type: Number
    },
    precio:{
        type: Number
    },
    tipoPago: {
        type: String,
        required: true,
        trim: true
    },
    fecha: {
        type: Date,
        default: Date.now()
    }

})

module.exports = mongoose.model('Compras', ComprasSchema);
