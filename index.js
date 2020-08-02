//require('./config/config')
const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors')

const bodyParser = require("body-parser");

//crear el servidor
const app = express();

//esta parte extiende el limite 
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true,parameterLimit:50000}));
//conectar a la DB
conectarDB();

//Habilitar cors
app.use(cors())

//habilitar express.json, ayuda a leer datos que el usuario coloque
app.use(express.json({extended:true}));

//puerto de la app
const port = process.env.PORT || 4000;


app.use("public/upload", express.static(__dirname + "public/upload"))


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