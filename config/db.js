const mongoose = require('mongoose');

require('dotenv').config({path: 'variables.env'});

const conectarDB = async() => {
    //process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


    let urlDB = 'mongodb+srv://damian:MI0E1zcZXQP20IwK@cluster0-naamb.mongodb.net/merntasks';
    
    
    // if (process.env.NODE_ENV === 'dev') {
    //     urlDB = 'mongodb+srv://damian:MI0E1zcZXQP20IwK@cluster0-naamb.mongodb.net/merntasks';
    // } else {
    //     //esta sintaxis es la correcta de lo contrario heroku no reconocera
    //     // la variable de entorno, bueno en este caso
    //     urlDB = 'mongodb+srv://damian:MI0E1zcZXQP20IwK@cluster0-naamb.mongodb.net/merntasks';;
    // }
    process.env.URLDB = urlDB;        

    mongoose.connect(process.env.URLDB, {
        useCreateIndex: true,
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useFindAndModify: false
        }).then(db => console.log('la base de datos esta conectada'))
        .catch(err => {
            console.log(err); 
            process.exit(1);
        });
}

module.exports = conectarDB;


//const mongoose = require('mongoose');







    // try {
    //     //await mongoose.connect(process.env.DB_MONGO, {
    //     await mongoose.connect(urlDB, {            
    //         useCreateIndex: true,
    //         useNewUrlParser: true,
    //         useUnifiedTopology: true,
    //         useFindAndModify: false
    //     });
    //     console.log('Database conectada');
    // } catch (error) {
    //     console.log(error);
    //     process.exit(1) //detener la app
    // }