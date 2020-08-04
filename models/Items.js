//modelo de la carjeta
// se extiende de Usuarios para futuros planes

const mongoose = require('mongoose');
const path = require('path');
const ItemsShema = mongoose.Schema({
    
    titulo: {
        type: String,        
        required: true,
        trim: true
    },
    precio: {
        type: Number,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true,
        //trim: true
    },
    img: {
        type: String,
        required: true        
    },
    disponibles: {
        type: Number,
        required: true,
        default: 0,
    },
    creador:{
        type: mongoose.Schema.Types.ObjectId,        
        ref: 'Usuario'
    },
    creado:{
        type: Date,
        default: Date.now()            
    }
})
//variable virtual se crea cuando se escribe codigo por ejemplo
//para obtener un dato, en este caso se ocupara para ocupar
//el id y no la extencion al momento de mandar a llamar  uniqueId
ItemsShema.virtual('uniqueId')
  .get(function () {
    return this.img.replace(path.extname(this.img), '');
  });

module.exports = mongoose.model('Items', ItemsShema);
