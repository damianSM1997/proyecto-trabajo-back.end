//require('./config/config')
const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors')

//crear el servidor
const app = express();

//conectar a la DB
conectarDB();

//Habilitar cors
app.use(cors())

//habilitar express.json, ayuda a leer datos que el usuario coloque
app.use(express.json({extended:true}));

//puerto de la app
const port = process.env.PORT || 4000;

//importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/items', require('./routes/items'));
app.use('/api/consultas', require('./routes/consultas'));
app.use('/api/compras', require('./routes/compras'));
app.use('/api/historial', require('./routes/historial'));




//arrancar la app
 app.listen(port, () => {
     console.log(`Server online puerto ${port}`)
 });

//app.listen(process.env.PORT, () => {
//    console.log('Escuchando puerto: ', process.env.PORT);
//});